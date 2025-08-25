import Link from "next/link";
import HelpSection from "@/components/help-section";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div className="space-y-16 my-8">
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200 rounded-box">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold tracking-tight">
              {t("navbarTitle")}
            </h1>
            <HelpSection />
            <Link href="/query" className="btn btn-primary btn-lg">
              {t("linkToQueryPage")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
