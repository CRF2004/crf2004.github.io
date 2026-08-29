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

type ProjectLinkKind = "demo" | "repo" | "docs";

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

  const demos = links?.demos ?? [];

  if (items.length === 0 && demos.length === 0) return null;

  const primaryKind = items[0]?.kind;

  return (
    <div className={LINK_STYLES[variant].wrapper}>
      {demos.map((demo, index) => (
        <a
          key={demo.href}
          href={demo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            index === 0
              ? LINK_STYLES[variant].primary
              : LINK_STYLES[variant].secondary
          }
        >
          {demo.label[locale as "en" | "zh"]}
        </a>
      ))}
      {items.map(({ kind, href }) => (
        <a
          key={kind}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            demos.length === 0 && kind === primaryKind
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
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <Link href={`/${locale}/projects/${slug}`} className="block">
        <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-sky-800">
          {title}
        </h3>
        <span className="text-lg text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-sky-600">↗</span>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </Link>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <ProjectLinkButtons links={links} locale={locale} variant="card" />
    </article>
  );
}
