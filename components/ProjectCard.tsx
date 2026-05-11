import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  locale: string;
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  locale,
}: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/projects/${slug}`}
      className="group block p-6 rounded-2xl border border-zinc-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 bg-white"
    >
      <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-accent transition-colors mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
