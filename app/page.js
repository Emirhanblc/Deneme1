import Link from 'next/link';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';

export default function Home() {
  const recentPosts = [
    {
      title: 'LVM Extend Sonrası XFS Büyümedi: Çözüm Adımları',
      href: '/blog/lvm-extend-xfs',
      date: '15 Nisan 2025',
      category: 'Güvenlik',
      excerpt:
        'Production VMware ortamında LVM genişletme işlemi sonrası XFS dosya sisteminin büyümeme sorununu nasıl çözdüm. Adım adım çözüm.',
      readTime: '5 dk okuma',
    },
    {
      title: 'Backup Network Ayrıştırma: VLAN Yapılandırması',
      href: '/blog/first-post',
      date: '8 Nisan 2025',
      category: 'Network',
      excerpt:
        "Yedekleme trafiğini ana network'ten ayırmak için VLAN tabanlı çözüm. Performans artışı ve güvenlik iyileştirmeleri.",
      readTime: '7 dk okuma',
    },
  ];

  return (
    <>
      {/* Hero Section - Modern & Engaging */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />

        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Sistem yönetimi ve{' '}
            <span className="text-primary-400">backend geliştirme</span> üzerine
            teknik yazılar
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-4 leading-relaxed">
            Production ortamlarında karşılaştığım sorunları ve çözümlerini
            paylaşıyorum. Gerçek projelerle çalışıyorum.
          </p>
          <p className="text-base sm:text-lg text-slate-400 mb-8">
            Bilgisayar Mühendisliği öğrencisiyim. Güvenlik, yedekleme altyapısı
            ve network konularına odaklanıyorum.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
            >
              Blog Yazılarını Oku
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section - Modern Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Son Yazılar
          </h2>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 group"
          >
            Tüm yazılar
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {recentPosts.map((post, index) => (
            <article
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <time className="text-sm text-slate-500 font-medium">
                  {post.date}
                </time>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                <Link href={post.href} className="hover:underline">
                  {post.title}
                </Link>
              </h3>

              <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.readTime}
                </span>
                <Link
                  href={post.href}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Devamını oku
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Side Project CTA - Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-semibold text-white">
              Side Project of the Month
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Kubernetes Monitoring Dashboard
          </h2>

          <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Production Kubernetes cluster'ları için gerçek zamanlı monitoring ve
            alert dashboard. Prometheus, Grafana ve custom exporter'lar ile
            container performansı ve resource kullanımı takibi.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {!isPlaceholder(SITE_CONFIG.projects.kubernetesMonitoring) && (
              <Link
                href={SITE_CONFIG.projects.kubernetesMonitoring}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub'da İncele
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            )}
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              Blog Yazılarını Oku
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Clean Card Design */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 sm:p-12 shadow-lg text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary-100">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-sm font-semibold text-primary-700">
              DevOps & Backend Insights
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Gerçek Dünya Çözümlerini Kaçırmayın
          </h2>

          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Production sistemlerde karşılaştığım gerçek sorunlar ve çözümlerini
            düzenli olarak paylaşıyorum. Yeni yazılardan haberdar olmak için
            abone olun.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            İletişime Geç / Abone Ol
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </Link>

          <p className="text-sm text-slate-500 mt-6">
            Haftalık sistem yönetimi ipuçları ve backend geliştirme rehberleri.
            Spam yok, sadece değerli içerik.
          </p>
        </div>
      </section>
    </>
  );
}
