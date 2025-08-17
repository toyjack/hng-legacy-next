import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "HNG Legacy Next",
  description: "次世代のHNG単字検索",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`flex flex-col min-h-screen antialiased md:subpixel-antialiased`}
      >
        <Header />
        <main className="flex-grow container mx-auto p-1 md:p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
