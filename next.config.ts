import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  output: "export",
  // If deploying to username.github.io/repo-name, uncomment and set:
  // basePath: "/repo-name",
};

export default withNextIntl(nextConfig);
