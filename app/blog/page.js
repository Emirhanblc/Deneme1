import Link from 'next/link';

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
    {
      title: 'Firebase Realtime Database ile Offline-First Uygulama',
      href: '/blog/first-post',
      date: '28 Mart 2025',
      category: 'Android',
      excerpt:
        'Android uygulamasında Firebase Realtime Database kullanarak offline-first mimari nasıl kurulur. Senkronizasyon stratejileri.',
      readTime: '9 dk okuma',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Tüm Yazılar
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik
            yazılar.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Meta Info */}
              <div className="flex items-center gap-3 mb-4">
                <time className="text-sm text-slate-500 font-medium flex items-center gap-1">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {post.date}
                </time>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                <Link href={post.href} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
      </div>
    </div>
  );
}
