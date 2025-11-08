import Link from 'next/link';
import {
  Shield,
  Network,
  Server,
  ArrowRight,
  Clock,
  Calendar,
} from 'lucide-react';

export const metadata = {
  title: 'Blog – Sistem Yönetimi & Backend',
  description:
    'Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik yazılar. Production ortamlarında karşılaşılan gerçek sorunlar ve çözümleri.',
};

export default function BlogPage() {
  const blogPosts = [
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
    {
      title: 'Firebase Realtime Database ile Offline-First Uygulama',
      href: '/blog/first-post',
      date: '28 Mart 2025',
      category: 'Android',
      icon: Server,
      excerpt:
        'Android uygulamasında Firebase Realtime Database kullanarak offline-first mimari nasıl kurulur. Senkronizasyon stratejileri.',
      readTime: '9 dk okuma',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Technical Background */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-slate-900 p-12 mb-16 animate-fade-in">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/50" />

          <div className="relative text-center">
            <div className="flex justify-center gap-4 mb-6 opacity-40">
              <Shield className="w-6 h-6 text-primary-400" />
              <Network className="w-6 h-6 text-primary-400" />
              <Server className="w-6 h-6 text-primary-400" />
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Tüm Yazılar
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed-plus">
              Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik
              yazılar. Production ortamlarından gerçek çözümler.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post, index) => {
            const IconComponent = post.icon;
            return (
              <article
                key={index}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-5 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-in-out animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                  <Link href={post.href}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 mb-6 leading-relaxed-plus line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-500">
                    <time className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link
                    href={post.href}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  >
                    Devamını oku
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
