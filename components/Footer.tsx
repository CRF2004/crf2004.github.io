import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Rongfeng Cheng. {t("rights")}</p>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="hover:text-zinc-700 transition-colors"
          >
            Email
          </Link>
          <a
            href="https://github.com/CRF2004"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-700 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>{t("built_with")}</p>
      </div>
    </footer>
  );
}
