"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  "home",
  "about",
  "projects",
  "experience",
  "publications",
  "blog",
  "cv",
] as const;

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-zinc-200">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight text-zinc-900 hover:text-accent transition-colors"
        >
          CRF
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const href = `/${locale}${item === "home" ? "" : `/${item}`}`;
            const isActive =
              item === "home"
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(`/${locale}/${item}`);
            return (
              <Link
                key={item}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-accent"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {t(item)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            {t("contact")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
