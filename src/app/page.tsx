"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: "url('/_3052c684-3f7d-43e1-b387-6c50c7121336.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      {/* Overlay suau per millorar la llegibilitat */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Títol principal amb font script */}
          <div className="mb-8">
            <p 
              className="text-wedding-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {t("home", "subtitle")}
            </p>
            
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl mb-6"
              style={{ 
                fontFamily: "'Nichollas Caffee', cursive",
                color: '#528185'
              }}
            >
              Natàlia & Marco
            </h1>
            
            <div className="w-32 h-0.5 bg-wedding-primary mx-auto my-8 opacity-50" />
          </div>
          
          {/* Data i lloc */}
          <div className="mb-12">
            <p 
              className="text-lg md:text-xl text-gray-700 mb-2"
              style={{ fontFamily: 'var(--font-cinzel)', letterSpacing: '0.2em' }}
            >
              CASTELLDEFELS
            </p>
            <p 
              className="text-wedding-primary font-medium"
              style={{ fontFamily: 'var(--font-cinzel)', letterSpacing: '0.1em' }}
            >
              SABADO · 2026
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/gallery"
              className="group relative px-10 py-4 overflow-hidden rounded-full transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: '#528185',
                color: '#FEFEFE',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.15em'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t("home", "cta_gallery")}
              </span>
              <div 
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: '#3D6366' }}
              />
            </Link>
            
            <Link
              href="/upload"
              className="group px-10 py-4 rounded-full border-2 transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderColor: '#528185',
                color: '#528185',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.15em'
              }}
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t("home", "cta_upload")}
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </section>

      {/* Info Section */}
      <section className="relative py-24 px-4 bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          {/* Divider decoratiu */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-primary/30" />
            <svg className="w-6 h-6 text-wedding-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
            </svg>
            <div className="flex-1 h-px bg-gradient-to-r from-wedding-primary/30 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-wedding-bg/30 to-white/50 border border-wedding-secondary/20">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#C2D9D140' }}
              >
                <svg className="w-10 h-10" style={{ color: '#528185' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-cinzel)', color: '#528185', letterSpacing: '0.1em' }}
              >
                Natàlia & Marco
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Una història d&apos;amor que comença una nova aventura
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-wedding-bg/30 to-white/50 border border-wedding-secondary/20">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#C2D9D140' }}
              >
                <svg className="w-10 h-10" style={{ color: '#528185' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-cinzel)', color: '#528185', letterSpacing: '0.1em' }}
              >
                Italia 🇮🇹
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Celebrant l&apos;amor al cor d&apos;Itàlia
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-wedding-bg/30 to-white/50 border border-wedding-secondary/20">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#C2D9D140' }}
              >
                <svg className="w-10 h-10" style={{ color: '#528185' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-cinzel)', color: '#528185', letterSpacing: '0.1em' }}
              >
                Comparteix
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Puja les teves fotos i recorda aquest dia especial
              </p>
            </div>
          </div>
          
          {/* Divider inferior */}
          <div className="flex items-center gap-4 mt-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-wedding-primary/30" />
            <svg className="w-5 h-5 text-wedding-primary opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
            </svg>
            <div className="flex-1 h-px bg-gradient-to-r from-wedding-primary/30 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
