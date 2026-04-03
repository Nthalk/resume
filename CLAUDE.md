# Resume / Blog Site

Personal site: resume + blog on LLM-driven development practices.

## Stack
- React + TypeScript + Vite
- react-router-dom for routing
- prism-react-renderer for code highlighting
- No backend — static SPA

## Writing Style Evolution
- When the user corrects or guides writing style with generic, philosophy-driven advice, add it to this file under "Writing Style" for future sessions.
- Style feedback that's situational or one-off stays in the conversation. Reusable principles live here.

## Writing Style (Blog)
- Lead with impact. First sentence is the consequence, the stakes, or the scene.
- Dry wit, not humor. Understated observations. Wry, not clever.
- Every sentence earns the next one. If a sentence doesn't make the reader want to read the next, cut it.
- Prefer no next sentence at all — concise beats thorough.
- Show, don't explain. "The `\\\\` spiral is a rite of passage nobody asked for" over "This is a common problem developers face."
- Reader perspective: put them in the situation ("Monday morning, you open the repo") not describing it abstractly.
- TL;DR at the top of every post — punchy, not a mini-abstract.
- Section headers are scan anchors. Make them do work: "The blind spot" not "The problem."
- Cut: restated context, trailing summaries, filler transitions, paragraphs that explain what the previous one said.
- Bullet lists for actionable items. Prose for arguments and perspective.

## Content Structure
- All blog content lives in `src/blog.ts` as a typed array of `BlogPost` objects.
- Each post has: slug, title, date, summary, content (string[]), compliancePrompt.
- Content blocks are markdown-ish: `##` headings, `**bold**`, `` `code` ``, ``` fenced code blocks, `- ` lists.
- Rendering is in `src/BlogPage.tsx` — custom markdown parser, not a library.
- Compliance prompts are functional audit checklists — keep them precise, not stylistic.

## CSS
- BEM naming: `.blog-post__title`, `.compliance-check__copy`
- CSS custom properties for theming (defined in App.css)
- No CSS modules or CSS-in-JS

## Dev
- `npm run dev` — Vite on localhost:5173
- `npx tsc --noEmit` — type check
