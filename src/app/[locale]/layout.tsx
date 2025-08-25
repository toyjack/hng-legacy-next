import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/dist/client/components/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "HNG Legacy Next",
  description: "次世代のHNG単字検索",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html>
      <body
        className={`flex flex-col min-h-screen antialiased md:subpixel-antialiased`}
      >
        <NextIntlClientProvider>
          <Header />
          <main className="flex-grow container mx-auto p-1 md:p-4">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
