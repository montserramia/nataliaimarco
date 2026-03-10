"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Títol principal amb font script */}
          <div className="mb-8">
            <p 
              className="text-wedding-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Abhaya Libre', serif", letterSpacing: '0.3em' }}
            >
              {t("home", "subtitle")}
            </p>
            
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl mb-6"
              style={{ 
                fontFamily: "'Brittany Signature', 'Brittany', cursive",
                color: '#528185',
                fontWeight: 400
              }}
            >
              {t("home", "couple_name")}
            </h1>
            
            <div className="w-32 h-0.5 bg-wedding-primary mx-auto my-8 opacity-50" />
          </div>
          
          {/* Data i lloc */}
          <div className="mb-12">
            <p 
              className="text-lg md:text-xl text-gray-700 mb-2"
              style={{ fontFamily: "'Abhaya Libre', serif", letterSpacing: '0.2em' }}
            >
              {t("event", "location")}
            </p>
            <p 
              className="text-wedding-primary font-medium"
              style={{ fontFamily: "'Abhaya Libre', serif", letterSpacing: '0.1em' }}
            >
              {t("event", "date")}
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
                fontFamily: "'Abhaya Libre', serif",
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
                fontFamily: "'Abhaya Libre', serif",
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
            {/* Card 1 - Amor Universal */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-wedding-bg/30 to-white/50 border border-wedding-secondary/20">
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#C2D9D140' }}
              >
                <svg className="w-10 h-10" style={{ color: '#528185' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "'Abhaya Libre', serif", color: '#528185', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                {t("cards", "love_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t("cards", "love_desc")}
              </p>
            </div>

            {/* Card 2 - Comparteix */}
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
                style={{ fontFamily: "'Abhaya Libre', serif", color: '#528185', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                {t("cards", "share_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t("cards", "share_desc")}
              </p>
            </div>

            {/* Card 3 - Recorda */}
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
                style={{ fontFamily: "'Abhaya Libre', serif", color: '#528185', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                {t("cards", "remember_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t("cards", "remember_desc")}
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
