import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
};

export default function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("publications");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-10">{t("title")}</h1>

      <div className="space-y-8">
        {/* Paper */}
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider">
              {t("paper_label")}
            </span>
            <span className="text-sm text-zinc-400">{t("paper_status")}</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            {t("paper_title")}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {t("paper_desc")}
          </p>
        </div>

        {/* Software Copyright */}
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider">
              {t("software_label")}
            </span>
            <span className="text-sm text-zinc-400">{t("software_status")}</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            {t("software_title")}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {t("software_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
