export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string[];
  compliancePrompt: string;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^"(.*)"$/, "$1");
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

function parsePost(raw: string): BlogPost {
  const { meta, body } = parseFrontmatter(raw);

  let content: string;
  let compliancePrompt = "";

  const complianceMatch = body.match(
    /<!-- compliance-prompt\n([\s\S]*?)\n-->/
  );
  if (complianceMatch) {
    compliancePrompt = complianceMatch[1].trim();
    content = body.replace(complianceMatch[0], "").trim();
  } else {
    content = body.trim();
  }

  // Split into blocks: each paragraph/heading/list/code-fence is a block
  // Simple approach: split on double newlines, preserving code fences
  const blocks: string[] = [];
  const lines = content.split("\n");
  let current: string[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeFence) {
        current.push(line);
        blocks.push(current.join("\n"));
        current = [];
        inCodeFence = false;
      } else {
        if (current.length > 0 && current.some((l) => l.trim())) {
          blocks.push(current.join("\n"));
          current = [];
        }
        current.push(line);
        inCodeFence = true;
      }
    } else if (inCodeFence) {
      current.push(line);
    } else if (line.trim() === "") {
      if (current.length > 0 && current.some((l) => l.trim())) {
        blocks.push(current.join("\n"));
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0 && current.some((l) => l.trim())) {
    blocks.push(current.join("\n"));
  }

  return {
    slug: meta.slug || "",
    title: meta.title || "",
    date: meta.date || "",
    summary: meta.summary || "",
    content: blocks,
    compliancePrompt,
  };
}

const modules = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts: BlogPost[] = Object.values(modules).map((raw) =>
  parsePost(raw as string)
);
