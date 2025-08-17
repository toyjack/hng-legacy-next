import type { Metadata } from "next";
import "./globals.css";

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
        className={`antialiased md:subpixel-antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
