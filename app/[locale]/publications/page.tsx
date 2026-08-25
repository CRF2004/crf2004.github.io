import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Publications",
};

const coauthoredPapers = [
  {
    key: "coauth_2",
  },
  {
    key: "coauth_1",
    href: "https://doi.org/10.1016/j.isci.2026.115073",
  },
] as const;

export default function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("publications");

  const firstAuthorWorks = [
    {
      status: t("under_review"),
      title: t("bibm_title"),
      venue: t("bibm_venue"),
      description: t("bibm_desc"),
    },
    {
      status: t("under_review"),
      title: t("jbhi_title"),
      venue: t("jbhi_venue"),
      description: t("jbhi_desc"),
    },
  ];

  const ongoingCollaborations = [
    {
      status: t("ongoing"),
      role: t("research_lead_role"),
      title: t("pathclip_title"),
      venue: t("pathclip_venue"),
      description: t("pathclip_desc"),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-10">{t("title")}</h1>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4 uppercase tracking-wider">
          {t("first_author")}
        </h2>
        <div className="space-y-5">
          {firstAuthorWorks.map((work) => (
            <article
              key={work.title}
              className="p-6 rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                  {work.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  {t("first_author_role")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
                {work.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">{work.venue}</p>
              <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
                {work.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4 uppercase tracking-wider">
          {t("ongoing_collaborations")}
        </h2>
        <div className="space-y-5">
          {ongoingCollaborations.map((work) => (
            <article key={work.title} className="p-6 rounded-2xl border border-zinc-200 bg-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                  {work.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  {work.role}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 leading-snug">{work.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{work.venue}</p>
              <p className="text-sm text-zinc-600 mt-3 leading-relaxed">{work.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 uppercase tracking-wider">
            {t("selected_coauthored")}
          </h2>
          <a
            href="https://orcid.org/0009-0002-3021-9647"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            {t("orcid_label")}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white">
          <ul className="space-y-3">
            {coauthoredPapers.map((paper) => (
              <li key={paper.key} className="text-sm text-zinc-600 flex items-start gap-2">
                <span className="text-zinc-300 mt-1.5 shrink-0">•</span>
                <span>
                  {t(paper.key)}{" "}
                  {"href" in paper && (
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-zinc-400 hover:text-accent transition-colors"
                      aria-label="Open publication"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
