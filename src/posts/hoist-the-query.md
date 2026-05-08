---
title: "sqlc: wontfix(handle aggregation, ordering, pagination)"
slug: "hoist-the-query"
date: "2026-05-08"
summary: "sqlc users have been asking for safe runtime composition (pagination, sort, column discards, aggregation) for years. The accepted answer is always 'use a query builder.' I forked it instead."
---

**TL;DR:** sqlc gives you compile-time SQL safety. The moment you need a sortable column, a paginated list, or a filterable admin grid, you are back to string-building. metaquery hoists every sqlc query as a CTE so you can layer typed filters, ordering, pagination, and aggregations on top, without modifying the original SQL. [sqlc-go-codegen-metaquery on GitHub](https://github.com/IodeSystems/sqlc-go-codegen-metaquery).

## Where sqlc fits

Four ways teams talk to SQL, ordered by how much they cost you:

- **Raw strings.** Full SQL, zero safety. One typo, one outage.
- **Raw ORM.** Objects map to tables. The DSL covers easy queries. The rest falls back to strings.
- **Typed ORM.** Compiler catches shape errors. The DSL still doesn't speak window functions, recursive CTEs, or lateral joins natively. Anything tricky leaves the type system and re-enters as an escape hatch.
- **sqlc.** Write the SQL. It's validated against your real schema at codegen. Generated Go functions bind with correctly typed parameters and result sets. All of SQL's expressivity. All of a well-typed function's safety.

That last tier is the one most teams skip past, often because they don't know it exists. sqlc treats the SQL as the source of truth and the Go code as its shadow. A migration drifts and the compiler tells you. A column type changes and every call site breaks at compile time. The query you read in the file is the query Postgres runs, not a translation of one.

What sqlc gives up: runtime composition. The query is fixed at build time. Workarounds push the cost somewhere worse: more queries to maintain, more bytes on the wire, filter logic in Go that the database could have done in a fraction of the time.

The first time you want to filter `ListAuthors` by name or country, sort by either column, and paginate, you have three options. None of them feel right.

## The three bad answers

**Write N variants.** `ListAuthors`, `ListAuthorsByCountry`, `ListAuthorsByName`, `ListAuthorsByNameAndCountry`, `ListAuthorsOrderByCreatedAt`. The combinatorics start at 12 and end at "we have a query for that, somewhere." Every new filter doubles the surface.

**Drop to squirrel / jet / sqlx.** You get composition. You lose sqlc's whole pitch: SQL you can read, types the compiler checks. Now the database layer has two personalities and a mental tax for every reader.

**Hand-roll a metadata layer.** Build your own column registry, your own validator, your own `WHERE` assembler. You will reinvent a quarter of an ORM and ship the bugs that come with it.

This gap has been in sqlc's issue tracker year after year: pagination, dynamic sort, dynamic filter, column discards, aggregation. The accepted answer is consistent: that is not what sqlc is for. And it isn't. But the gap stays open, and every team using sqlc eventually hits it on the same day they wire up an admin UI.

## Hoist the query

The trick: don't rewrite the query. Wrap it.

```sql
WITH q AS (<your original sqlc query>)
SELECT <projected columns>
FROM q
WHERE <runtime filter>
ORDER BY <runtime order>
LIMIT <page size> OFFSET <page offset>;
```

Whatever the original was (joins, CTEs, recursive selects, window functions), it stays untouched inside `q`. The runtime layer only composes around it. Postgres's planner handles the wrapping efficiently for the shapes that actually show up in admin and list endpoints.

That single decision unlocks everything: filter, sort, page, aggregate, count, all against the **output** columns of the static query, all expressible at runtime, no SQL edits.

## Typed columns, JSON-roundtrippable

sqlc already knows each query's projected columns, their types, and the positional args. The fork captures that knowledge as runtime metadata and emits a typed builder on top of it. Just enough information to manipulate the query, nothing more.

The fork emits, per query:

```go
db.WrapListAuthors().
    ApplyFilter(db.ListAuthorsCols.Name.ILike("%ada%")).
    ApplyOrder(db.ListAuthorsCols.CreatedAt.Desc()).
    ApplyPagination(metaquery.PageRequest{Page: 0, Size: 20, Total: true})
```

`ListAuthorsCols.Name` is a `TextCol`. It has `.ILike(string)`. It does not have `.Gt(int64)`. The compiler catches column typos and op/type mismatches. The IDE autocompletes the valid operations and only the valid operations.

The same query runs from JSON: an HTTP handler accepts `{column, op, value}` from the client and validates against the same metadata before any SQL runs. Admin grids, faceted search, CSV exports, all riding on top of the same static query.

## Why a fork instead of a runtime library

A pure runtime library can wrap a query you hand it. It cannot know what `ListAuthors` projects, what types its columns are, or what positional args it takes. You would hand-write that metadata, or parse migrations, or scan reflection. Each option regresses on the thing sqlc was for.

The codegen plugin already has every type sqlc inferred. Reuse it. The fork adds three emission tiers (metadata, typed wrapper, typed columns) so queries that never need composition stay exactly as sqlc would have generated them. You pay for what you use, in lines of generated code.

## What it does not try to do

- **No query rewriting.** Filters reference output columns. Need to filter on something the query doesn't project? Widen the query or use the `WhereExpr` escape hatch.
- **Postgres + pgx/v5 only.** MySQL and SQLite aren't blocked architecturally, just not implemented. The pgx adapter lives in a sibling module so non-pgx users aren't dragged in.
- **Aggregates over empty groups return NULL.** `Sum`/`Avg`/`Min`/`Max` project the source column type without null-safety. Use `Agg("x", "coalesce(sum(y), 0)", "int64")` if that matters.

The point isn't to replace sqlc. It's to close the one gap that pushes people off it.

<!-- compliance-prompt
Audit this Go + sqlc project for safe runtime query composition. Report PASS, FAIL, or N/A for each item:

1. Query layer: Are all SQL queries in `.sql` files, validated at codegen time?
2. Variant explosion: Do you have N variants of similar queries that differ only by filter, sort, or pagination?
3. Typed filter surface: When a handler accepts a runtime filter, is the column name, operator, and value type validated against the query's actual output schema?
4. JSON roundtrip: Can a filter expressed as JSON be safely applied to a query without string concatenation?
5. Pagination: Is pagination implemented uniformly across endpoints, or hand-rolled per query?
6. Total count: When pagination needs a total, is the count derived from the same query, or a hand-maintained sibling?
7. Column whitelist: Can a client request a column that doesn't exist on the query's output? Is that caught before the query runs?
8. Op / type mismatch: Can a client send `{op: "ILIKE", value: 5}` against an integer column? Is that rejected before the query runs?
9. Aggregations: When aggregating (sum, count, min, max), are the column types and null behavior explicit?
10. Admin and internal UIs: Is the admin grid / search built on the same query layer as production reads, or a separate path?

For each FAIL, suggest one concrete next step.
-->
