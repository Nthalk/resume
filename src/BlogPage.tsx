import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Highlight, themes } from "prism-react-renderer";
import { posts } from "./blog";

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "plain";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      const code = codeLines.join("\n");
      elements.push(
        <Highlight key={i} theme={themes.vsDark} code={code} language={lang}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="blog-post__pre">
              <code>
                {tokens.map((line, li) => (
                  <div key={li} {...getLineProps({ line })}>
                    {line.map((token, ti) => (
                      <span key={ti} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="blog-post__h3">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith("- ")) {
        items.push(lines[j].slice(2));
        j++;
      }
      elements.push(
        <ul key={i} className="blog-post__list">
          {items.map((item, k) => (
            <li key={k} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ul>
      );
      i = j - 1;
    } else {
      elements.push(
        <p
          key={i}
          className="blog-post__p"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }
  }
  return elements;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, '<code class="blog-post__code">$1</code>');
}

function ComplianceCheck({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <details className="compliance-check">
      <summary className="compliance-check__summary">
        Check if your project complies
      </summary>
      <div className="compliance-check__body">
        <p className="compliance-check__intro">
          Paste this prompt into an LLM with access to your project to audit
          compliance. It will report PASS, FAIL, or N/A for each item.
        </p>
        <div className="compliance-check__prompt-wrap">
          <pre className="compliance-check__prompt">{prompt}</pre>
          <button
            className="compliance-check__copy"
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </details>
  );
}

function PostView({ post }: { post: (typeof posts)[0] }) {
  return (
    <article className="blog-post">
      <Link to="/blog" className="blog-post__back">
        &larr; All posts
      </Link>
      <time className="blog-post__date">{post.date}</time>
      <h1 className="blog-post__title">{post.title}</h1>
      <div className="blog-post__body">
        {post.content.map((block, i) => (
          <div key={i}>{renderMarkdown(block)}</div>
        ))}
      </div>
      <ComplianceCheck prompt={post.compliancePrompt} />
    </article>
  );
}

function PostList() {
  return (
    <>
      <h1 className="page__title">Blog</h1>
      <p className="page__subtitle">
        Thoughts on multi-agent orchestration, LLM tool design, and building
        software in the age of automated development.
      </p>
      <div className="blog-list">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-card"
          >
            <time className="blog-card__date">{post.date}</time>
            <h2 className="blog-card__title">{post.title}</h2>
            <p className="blog-card__summary">{post.summary}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function BlogPage() {
  const { slug } = useParams();
  const post = slug ? posts.find((p) => p.slug === slug) : null;

  return (
    <div className="page blog-page">
      {post ? <PostView post={post} /> : <PostList />}
    </div>
  );
}
