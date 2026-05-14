import Link from "next/link";
import type { ProjectLinks } from "@/lib/projects";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  locale: string;
  links?: ProjectLinks;
}

type ProjectLinkKind = keyof ProjectLinks;

interface ProjectLinkButtonsProps {
  links?: ProjectLinks;
  locale: string;
  variant?: "card" | "detail";
}

const LINK_KINDS: ProjectLinkKind[] = ["demo", "repo", "docs"];

const LINK_STYLES = {
  card: {
    wrapper: "flex flex-wrap gap-2",
    primary:
      "px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-colors",
    secondary:
      "px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors",
  },
  detail: {
    wrapper: "flex flex-wrap gap-3",
    primary:
      "px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors",
    secondary:
      "px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-50 transition-colors",
  },
} as const;

function linkLabel(kind: ProjectLinkKind, locale: string) {
  if (locale === "zh") {
    if (kind === "demo") return "在线演示";
    if (kind === "repo") return "GitHub";
    return "文档";
  }

  if (kind === "demo") return "Live Demo";
  if (kind === "repo") return "GitHub";
  return "Docs";
}

export function ProjectLinkButtons({
  links,
  locale,
  variant = "card",
}: ProjectLinkButtonsProps) {
  const items: Array<{ kind: ProjectLinkKind; href: string }> = [];

  for (const kind of LINK_KINDS) {
    const href = links?.[kind];
    if (href) items.push({ kind, href });
  }

  if (items.length === 0) return null;

  const primaryKind = items[0]?.kind;

  return (
    <div className={LINK_STYLES[variant].wrapper}>
      {items.map(({ kind, href }) => (
        <a
          key={kind}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            kind === primaryKind
              ? LINK_STYLES[variant].primary
              : LINK_STYLES[variant].secondary
          }
        >
          {linkLabel(kind, locale)}
        </a>
      ))}
    </div>
  );
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  locale,
  links,
}: ProjectCardProps) {
  return (
    <article className="group p-6 rounded-2xl border border-zinc-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 bg-white">
      <Link href={`/${locale}/projects/${slug}`} className="block">
        <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-accent transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </Link>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <ProjectLinkButtons links={links} locale={locale} variant="card" />
    </article>
  );
}
