import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import ResearchSignal from "@/components/ResearchSignal";
import { ArrowRight, FileText } from "lucide-react";

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
    <div className="overflow-hidden">
      <section className="hero-wash relative border-b border-slate-200/70">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-sm font-medium text-sky-700">
              <span className="h-px w-8 bg-sky-500" />
              {t("greeting")} {t("name")}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 md:text-6xl">
              {t("headline")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              {t("cta_projects")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`/${locale}/cv`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-800"
            >
              <FileText className="h-4 w-4" />
              {t("cta_cv")}
            </Link>
          </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-200 pt-6">
              {(["papers", "clinical", "focus"] as const).map((key) => (
                <div key={key}>
                  <p className="font-mono text-lg font-semibold text-slate-900">{t(`proof.${key}.value`)}</p>
                  <p className="mt-1 text-xs text-slate-500">{t(`proof.${key}.label`)}</p>
                </div>
              ))}
            </div>
          </div>
          <ResearchSignal locale={locale} />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {(["health_ai", "knowledge_graphs", "interpretable_ml"] as const).map(
              (key, index) => (
                <div key={key} className="relative md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-slate-200">
                  <span className="font-mono text-xs text-sky-600">0{index + 1}</span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">
                    {t(`highlights.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {t(`highlights.${key}.description`)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-sky-700">{t("work_label")}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            {t("recent_projects")}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            {t("read_more")}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
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
      </section>
    </div>
  );
}
