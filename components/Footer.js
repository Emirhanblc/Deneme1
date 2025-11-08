'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-12">
        {/* Main Content - 2 Columns */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* Column 1: Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-100 text-xs font-mono font-bold">
                &gt;_
              </div>
              <span className="font-semibold text-slate-100">
                {SITE_CONFIG.author.name}
              </span>
            </div>

            {/* Mission Statement */}
            <p className="text-sm text-slate-400 leading-relaxed mt-2 max-w-md">
              Production sistemler için çözüm rehberi. Linux, network, backend
              geliştirme ve sistem yönetimi üzerine teknik yazılar.
            </p>
          </div>

          {/* Column 2: Social Media */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
              Bağlantılar
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {!isPlaceholder(SITE_CONFIG.contact.github) && (
                <a
                  href={SITE_CONFIG.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {!isPlaceholder(SITE_CONFIG.contact.linkedin) && (
                <a
                  href={SITE_CONFIG.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {!isPlaceholder(SITE_CONFIG.contact.email) && (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Legal & Copyright Line */}
        <div className="border-t border-slate-800 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {year} {SITE_CONFIG.author.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-slate-400 transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="#" className="hover:text-slate-400 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
