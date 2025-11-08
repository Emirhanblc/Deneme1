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
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-6">
            Tüm Yazılar
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed-plus">
            Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik
            yazılar. Production ortamlarından gerçek çözümler.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post, index) => {
            const IconComponent = post.icon;
            return (
              <article
                key={index}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-primary-50 text-primary-600">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                  <Link href={post.href}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-neutral-600 mb-6 leading-relaxed-plus line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
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
      </div>
    </div>
  );
}
