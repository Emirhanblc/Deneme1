import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'LVM Extend Sonrası XFS Büyümedi: Çözüm Adımları',
      href: '/blog/lvm-extend-xfs',
      date: '15 Nisan 2025',
      category: 'Güvenlik',
      excerpt: 'Production VMware ortamında LVM genişletme işlemi sonrası XFS dosya sisteminin büyümeme sorununu nasıl çözdüm. Adım adım çözüm.',
      readTime: '5 dk okuma'
    },
    {
      title: 'Backup Network Ayrıştırma: VLAN Yapılandırması',
      href: '/blog/first-post',
      date: '8 Nisan 2025',
      category: 'Network',
      excerpt: 'Yedekleme trafiğini ana network\'ten ayırmak için VLAN tabanlı çözüm. Performans artışı ve güvenlik iyileştirmeleri.',
      readTime: '7 dk okuma'
    },
    {
      title: 'Firebase Realtime Database ile Offline-First Uygulama',
      href: '/blog/first-post',
      date: '28 Mart 2025',
      category: 'Android',
      excerpt: 'Android uygulamasında Firebase Realtime Database kullanarak offline-first mimari nasıl kurulur. Senkronizasyon stratejileri.',
      readTime: '9 dk okuma'
    }
  ]

  return (
    <div className="blog-page">
      <div className="page-header">
        <h1 className="page-title">Tüm Yazılar</h1>
        <p className="page-description">
          Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik yazılar.
        </p>
      </div>

      <div className="posts-list">
        {blogPosts.map((post, index) => (
          <article key={index} className="post-card">
            <div className="post-meta">
              <time dateTime="2025-04-15" className="muted">{post.date}</time>
              <span className="separator">·</span>
              <span className="badge">{post.category}</span>
            </div>
            <h2 className="post-title">
              <Link href={post.href}>{post.title}</Link>
            </h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-footer">
              <span className="read-time muted">{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
