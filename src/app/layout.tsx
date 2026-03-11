import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/ui/Header";

// 1. Metadades principals (SEO + Open Graph)
export const metadata: Metadata = {
  title: "Natalia & Marco",
  description: "Album fotografico del matrimonio di Natalia e Marco",
  manifest: "/manifest.json",
  
  // ✅ AIXÒ ÉS EL QUE FALTAVA (Open Graph per a WhatsApp)
  openGraph: {
    title: "Natalia & Marco",
    description: "Unisciti a noi nel nostro giorno speciale",
    url: "https://nataliaemarco.online",
    siteName: "Natalia & Marco",
    images: [
      {
        url: "/og-image.png", // La imatge que ja has creat
        width: 1200,
        height: 630,
        alt: "Natalia e Marco",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  
  // Twitter Card (opcional, però recomanat)
  twitter: {
    card: "summary_large_image",
    title: "Natalia & Marco",
    description: "Album fotografico del matrimonio di Natalia e Marco",
    images: ["/og-image.png"],
  },

  // Favicon i icones
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
  
  // ❌ He tret 'viewport' d'aquí (va a l'exportació de sota)
};

// 2. Configuració de Viewport (separada, com recomana Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#528185",
};

// 3. Layout Principal
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