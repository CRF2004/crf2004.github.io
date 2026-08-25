import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, FileText, Mail, ExternalLink } from "lucide-react";

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
      <section className="hero-wash border-b border-slate-200/70">
        <div className="mx-auto grid max-w-5xl gap-14 px-6 pb-16 pt-20 md:pb-24 md:pt-28 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="mb-3 text-sm font-medium text-sky-700">{t("role")}</p>
            <h1 className="text-5xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl">{t("name")}</h1>
            <p className="mt-4 text-base text-slate-500">{t("affiliation")}</p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700">{t("subtitle")}</p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link href={`/${locale}/cv`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-800">
                <FileText className="h-4 w-4" /> {t("cta_cv")}
              </Link>
              <a href="https://github.com/CRF2004" target="_blank" rel="noopener noreferrer" className="academic-link"><ExternalLink className="h-4 w-4" /> GitHub</a>
              <a href="https://orcid.org/0009-0002-3021-9647" target="_blank" rel="noopener noreferrer" className="academic-link"><ExternalLink className="h-4 w-4" /> ORCID</a>
              <Link href={`/${locale}/contact`} className="academic-link"><Mail className="h-4 w-4" /> Email</Link>
            </div>
          </div>

          <aside className="border-l border-slate-200 pl-6 lg:mt-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-700">{t("currently")}</p>
            <div className="mt-5 space-y-5">
              {(["revision", "review", "ongoing"] as const).map((key) => (
                <div key={key}>
                  <p className="text-sm font-semibold leading-5 text-slate-900">{t(`current.${key}.title`)}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{t(`current.${key}.detail`)}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
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
            <ArrowRight className="h-4 w-4" />
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
