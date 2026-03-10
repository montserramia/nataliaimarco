import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Natalia & Marco - Casament",
  description: "Àlbum de fotos del casament de la Natalia i en Marco",
  manifest: "/manifest.json",
  themeColor: "#528185",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", href: "/favicon.ico?v=2" },
      { url: "/apple-touch-icon.png?v=2", href: "/apple-touch-icon.png?v=2" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Natalia & Marco",
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
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main
            className="pt-20 min-h-screen"
            style={{
              backgroundImage: "url('/Natalia-Marco.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll"
            }}
          >
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
