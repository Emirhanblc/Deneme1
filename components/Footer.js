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
    <footer className="mt-20 border-t bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: About / Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-xs font-mono font-bold">
                &gt;_
              </div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {SITE_CONFIG.author.name}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
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
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
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
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {!isPlaceholder(SITE_CONFIG.contact.email) && (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-sm uppercase tracking-wider">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 inline-flex items-center gap-1 group"
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
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-sm uppercase tracking-wider">
              Teknoloji
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Legal Links */}
            <div className="space-y-2">
              <Link
                href="#"
                className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors block"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="#"
                className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors block"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-xs text-neutral-500 dark:text-neutral-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span>
              © {year} {SITE_CONFIG.author.name}.
            </span>
            <span className="hidden sm:inline">Tüm hakları saklıdır.</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-600">
            <Terminal className="w-3.5 h-3.5" />
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
