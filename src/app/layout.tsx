import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/ui/Header";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Natàlia & Marco - Casament",
  description: "Àlbum de fotos del casament de la Natàlia i en Marco",
  manifest: "/manifest.json",
  themeColor: "#528185",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Natàlia & Marco",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className={`${cinzel.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          <main className="pt-20">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
