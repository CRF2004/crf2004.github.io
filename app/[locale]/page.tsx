import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  const featured = getFeaturedProjects();

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          <p className="text-lg text-accent font-medium mb-3">
            {t("greeting")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            {t("name")}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 font-medium mb-6">
            {t("tagline")}
          </p>
          <p className="text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/projects`}
              className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
            >
              {t("cta_projects")}
            </Link>
            <Link
              href={`/${locale}/cv`}
              className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
            >
              {t("cta_cv")}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {(["health_ai", "knowledge_graphs", "interpretable_ml"] as const).map(
              (key) => (
                <div key={key} className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {t(`highlights.${key}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {t(`highlights.${key}.description`)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">
            {t("recent_projects")}
          </h2>
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            {t("read_more")}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title[locale as "en" | "zh"]}
              description={p.description[locale as "en" | "zh"]}
              tags={p.tags}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
