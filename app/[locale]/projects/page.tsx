import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projects");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-3">{t("title")}</h1>
      <p className="text-lg text-zinc-500 mb-10">{t("subtitle")}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            slug={p.slug}
            title={p.title[locale as "en" | "zh"]}
            description={p.description[locale as "en" | "zh"]}
            tags={p.tags}
            locale={locale}
            links={p.links}
          />
        ))}
      </div>
    </div>
  );
}
