import Link from 'next/link';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';
import {
  ArrowRight,
  Clock,
  Server,
  Shield,
  Network,
  Terminal,
  GitBranch,
  Zap,
  Mail,
  Github,
} from 'lucide-react';

export default function Home() {
  const recentPosts = [
    {
      title: 'LVM Extend Sonrası XFS Büyümedi: Çözüm Adımları',
      href: '/blog/lvm-extend-xfs',
      date: '15 Nisan 2025',
      category: 'Güvenlik',
      icon: Shield,
      excerpt:
        'Production VMware ortamında LVM genişletme işlemi sonrası XFS dosya sisteminin büyümeme sorununu nasıl çözdüm. Adım adım çözüm.',
      readTime: '5 dk okuma',
    },
    {
      title: 'Backup Network Ayrıştırma: VLAN Yapılandırması',
      href: '/blog/first-post',
      date: '8 Nisan 2025',
      category: 'Network',
      icon: Network,
      excerpt:
        "Yedekleme trafiğini ana network'ten ayırmak için VLAN tabanlı çözüm. Performans artışı ve güvenlik iyileştirmeleri.",
      readTime: '7 dk okuma',
    },
  ];

  return (
    <>
      {/* Hero Section - Modern & Engaging */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-24 px-4 sm:px-6 lg:px-8">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] animate-grid-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center animate-fade-in">
          {/* System Icons floating */}
          <div className="flex justify-center gap-6 mb-8 opacity-40">
            <div className="animate-pulse" style={{ animationDelay: '0s' }}>
              <Server className="w-8 h-8 text-primary-400" />
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>
              <Terminal className="w-8 h-8 text-primary-400" />
            </div>
            <div className="animate-pulse" style={{ animationDelay: '1s' }}>
              <Shield className="w-8 h-8 text-primary-400" />
            </div>
            <div className="animate-pulse" style={{ animationDelay: '1.5s' }}>
              <Network className="w-8 h-8 text-primary-400" />
            </div>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Sistem yönetimi ve{' '}
            <span className="text-primary-400">backend geliştirme</span> üzerine
            teknik yazılar
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-300 mb-4 leading-relaxed max-w-3xl mx-auto">
            Production ortamlarında karşılaştığım sorunları ve çözümlerini
            paylaşıyorum. Gerçek projelerle çalışıyorum.
          </p>
          <p className="text-base sm:text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            Bilgisayar Mühendisliği öğrencisiyim. Güvenlik, yedekleme altyapısı
            ve network konularına odaklanıyorum.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
            >
              Blog Yazılarını Oku
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Terminal className="w-5 h-5" />
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section - Modern Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Son Yazılar
          </h2>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 group"
          >
            Tüm yazılar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {recentPosts.map((post, index) => {
            const IconComponent = post.icon;
            return (
              <article
                key={index}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-primary-50 text-primary-600">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                  <Link href={post.href}>{post.title}</Link>
                </h3>

                <p className="text-neutral-600 mb-6 leading-relaxed-plus line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <time className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4" />
                      {post.date}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link
                    href={post.href}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  >
                    Devamını oku
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Side Project CTA - Modern Design with Tech Stack */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px] animate-grid-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          {/* Header Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
                Side Project of the Month
              </span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Kubernetes Monitoring Dashboard
            </h2>

            <p className="text-lg text-primary-50 mb-6 leading-relaxed-plus max-w-3xl mx-auto">
              Production Kubernetes cluster'ları için gerçek zamanlı monitoring
              ve alert dashboard. Prometheus, Grafana ve custom exporter'lar ile
              container performansı ve resource kullanımı takibi.
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <span className="tech-badge bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Server className="w-3.5 h-3.5" />
                Kubernetes
              </span>
              <span className="tech-badge bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Terminal className="w-3.5 h-3.5" />
                Prometheus
              </span>
              <span className="tech-badge bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5" />
                Grafana
              </span>
              <span className="tech-badge bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Network className="w-3.5 h-3.5" />
                Docker
              </span>
              <span className="tech-badge bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <GitBranch className="w-3.5 h-3.5" />
                Node.js
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {!isPlaceholder(SITE_CONFIG.projects.kubernetesMonitoring) && (
              <Link
                href={SITE_CONFIG.projects.kubernetesMonitoring}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Github className="w-5 h-5" />
                GitHub'da İncele
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Terminal className="w-5 h-5" />
              Blog Yazılarını Oku
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Clean Card Design */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-white p-10 sm:p-14 shadow-xl text-center hover:shadow-2xl transition-shadow duration-300">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary-100 border border-primary-200">
            <Zap className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-mono font-semibold text-primary-700 uppercase tracking-wider">
              DevOps & Backend Insights
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Gerçek Dünya Çözümlerini Kaçırmayın
          </h2>

          <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed-plus">
            Production sistemlerde karşılaştığım gerçek sorunlar ve çözümlerini
            düzenli olarak paylaşıyorum. Yeni yazılardan haberdar olmak için
            abone olun.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <Mail className="w-5 h-5" />
            İletişime Geç / Abone Ol
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-sm text-neutral-500 mt-8 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4" />
            Haftalık sistem yönetimi ipuçları ve backend geliştirme rehberleri.
            Spam yok, sadece değerli içerik.
          </p>
        </div>
      </section>
    </>
  );
}
