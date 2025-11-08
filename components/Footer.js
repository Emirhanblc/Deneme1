'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Terminal, Server, Shield } from 'lucide-react';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '/blog', label: 'Blog Yazıları' },
    { href: '/projects', label: 'Projeler' },
    { href: '/glossary', label: 'Sözlük' },
    { href: '/scripts', label: "Script'ler" },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
  ];

  const techStack = [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Vercel',
  ];

  return (
    <footer className="mt-16 border-t bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: About / Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono font-bold">
                &gt;_
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                {SITE_CONFIG.author.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {SITE_CONFIG.site.tagline}. Production ortamlarında karşılaştığım
              gerçek sorunları ve çözümlerini paylaşıyorum.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {!isPlaceholder(SITE_CONFIG.contact.github) && (
                <a
                  href={SITE_CONFIG.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {!isPlaceholder(SITE_CONFIG.contact.linkedin) && (
                <a
                  href={SITE_CONFIG.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {!isPlaceholder(SITE_CONFIG.contact.email) && (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tech Stack & Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
              Legal & Technical
            </h3>

            {/* Legal Links */}
            <div className="space-y-2 mb-4">
              <Link
                href="#"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors block"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors block"
              >
                Kullanım Koşulları
              </Link>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              © {year} {SITE_CONFIG.author.name}. Built with Next.js, React,
              Tailwind, and Vercel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
