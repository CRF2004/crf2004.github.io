"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`[Website Contact] from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:eb1287945452@mail.scut.edu.cn?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-3">{t("title")}</h1>
      <p className="text-lg text-zinc-500 mb-10">{t("subtitle")}</p>

      {sent ? (
        <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm">
          {t("sent")}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              {t("name_label")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              {t("email_label")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              {t("message_label")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
          >
            {t("send")}
          </button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-zinc-200 text-sm text-zinc-500 space-y-2">
        <p>
          {t("email_me")}{" "}
          <a
            href="mailto:eb1287945452@mail.scut.edu.cn"
            className="text-accent hover:text-accent-dark transition-colors"
          >
            eb1287945452@mail.scut.edu.cn
          </a>
        </p>
        <p>
          {t("github")}:{" "}
          <a
            href="https://github.com/CRF2004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark transition-colors"
          >
            CRF2004
          </a>
        </p>
        <p>{t("location")}</p>
      </div>
    </div>
  );
}
