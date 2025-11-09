'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Terminal } from 'lucide-react';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-slate-800/50">
      {/* Soft Vertical Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-950 pointer-events-none" />

      {/* Subtle Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Left: Mission with Icon */}
          <div className="flex items-start gap-3 md:col-span-2">
            <div className="flex-shrink-0 mt-0.5">
              <Terminal className="w-4 h-4 text-sky-400/70" />
            </div>
            <div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Production sistemler için çözüm rehberi.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Linux, network, backend geliştirme ve sistem yönetimi üzerine
                teknik yazılar.
              </p>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-start md:justify-end">
            <div className="flex items-center gap-4">
              {!isPlaceholder(SITE_CONFIG.contact.github) && (
                <a
                  href={SITE_CONFIG.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-slate-500 hover:text-sky-400 transition-colors duration-200 ease-out"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                  {/* Subtle hover glow */}
                  <span className="absolute inset-0 rounded-full blur-sm bg-sky-400/0 group-hover:bg-sky-400/10 transition-all duration-200" />
                </a>
              )}

              {!isPlaceholder(SITE_CONFIG.contact.linkedin) && (
                <a
                  href={SITE_CONFIG.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-slate-500 hover:text-sky-400 transition-colors duration-200 ease-out"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="absolute inset-0 rounded-full blur-sm bg-sky-400/0 group-hover:bg-sky-400/10 transition-all duration-200" />
                </a>
              )}

              {/* Twitter/X */}
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-slate-500 hover:text-sky-400 transition-colors duration-200 ease-out"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
                <span className="absolute inset-0 rounded-full blur-sm bg-sky-400/0 group-hover:bg-sky-400/10 transition-all duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Technical Info */}
        <div className="relative">
          {/* Soft separator line with gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-800/80 to-transparent" />

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            {/* Copyright */}
            <div className="text-slate-500">
              © {year}{' '}
              <span className="text-slate-400 font-medium">
                {SITE_CONFIG.author.name}
              </span>
              . All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-slate-500">
              <Link
                href="/privacy"
                className="hover:text-sky-400 hover:underline underline-offset-4 transition-colors duration-200 ease-out"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-700">·</span>
              <Link
                href="/terms"
                className="hover:text-sky-400 hover:underline underline-offset-4 transition-colors duration-200 ease-out"
              >
                Terms of Use
              </Link>
            </div>

            {/* Powered by */}
            <div className="text-slate-600 flex items-center gap-1.5">
              <span>Powered by</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-400 transition-colors duration-200 ease-out font-medium"
              >
                Next.js
              </a>
              <span className="text-slate-700">&</span>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-400 transition-colors duration-200 ease-out font-medium"
              >
                Vercel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
