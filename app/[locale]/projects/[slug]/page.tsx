import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import { routing } from "@/lib/routing";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Not Found" };
  return { title: p.title[locale as "en" | "zh"] };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projects");
  const p = getProject(slug);

  if (!p) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">
          {locale === "en" ? "Project not found" : "项目未找到"}
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <Link
        href={`/${locale}/projects`}
        className="text-sm text-zinc-500 hover:text-accent transition-colors mb-6 inline-block"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 mb-4">
        {p.title[locale as "en" | "zh"]}
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="prose prose-zinc max-w-none">
        <p className="text-lg text-zinc-600 leading-relaxed">
          {p.description[locale as "en" | "zh"]}
        </p>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
        <p className="text-sm text-zinc-500">
          Detailed project description coming soon. For now, check the source
          code or reach out to discuss this project.
        </p>
      </div>
    </div>
  );
}
