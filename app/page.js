import Link from 'next/link'

export default function Home() {
  const recentPosts = [
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
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Sistem yönetimi ve backend geliştirme üzerine teknik yazılar
        </h1>
        <p className="hero-subtitle">
          Production ortamlarında karşılaştığım sorunları ve çözümlerini
          paylaşıyorum. Gerçek projelerle çalışıyorum.
        </p>
        <p className="hero-description">
          Bilgisayar Mühendisliği öğrencisiyim. Güvenlik, yedekleme altyapısı ve
          network konularına odaklanıyorum.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Blog Yazılarını Oku
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Abone Ol / İletişime Geç
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="recent-posts">
        <div className="section-header">
          <h2 className="section-title">Son Yazılar</h2>
          <Link href="/blog" className="section-link">Tüm yazılar →</Link>
        </div>

        <div className="posts-grid">
          {recentPosts.map((post, index) => (
            <article key={index} className="post-card">
              <div className="post-meta">
                <time dateTime="2025-04-15" className="muted">{post.date}</time>
                <span className="separator">·</span>
                <span className="badge">{post.category}</span>
              </div>
              <h3 className="post-title">
                <Link href={post.href}>{post.title}</Link>
              </h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-footer">
                <span className="read-time muted">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Side Project CTA */}
      <section 
        className="cta-section"
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
          color: 'white'
        }}
      >
        <div className="cta-content">
          <h2 className="cta-title" style={{ color: 'white' }}>
            🚀 Side Project of the Month
          </h2>
          <p className="cta-description" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <strong>Kubernetes Monitoring Dashboard</strong> - Production
            Kubernetes cluster'ları için gerçek zamanlı monitoring ve alert
            dashboard. Prometheus, Grafana ve custom exporter'lar ile container
            performansı ve resource kullanımı takibi.
          </p>
          <div className="cta-actions">
            <Link
              href="https://github.com/yourusername/kubernetes-monitoring"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: 'white', color: 'var(--accent)' }}
            >
              GitHub'da İncele →
            </Link>
            <Link
              href="/blog"
              className="cta-button secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderColor: 'white'
              }}
            >
              Blog Yazılarını Oku →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">DevOps & Backend Insights</h2>
          <p className="cta-description">
            Production sistemlerde karşılaştığım gerçek sorunlar ve çözümlerini
            düzenli olarak paylaşıyorum. Yeni yazılardan haberdar olmak için
            abone olun.
          </p>
          <div className="newsletter-form">
            <div className="newsletter-form-inner">
              <Link
                href="/contact"
                className="cta-button inline-block text-center"
              >
                İletişime Geç / Abone Ol
              </Link>
            </div>
            <p className="newsletter-note">
              Haftalık sistem yönetimi ipuçları ve backend geliştirme
              rehberleri. Spam yok, sadece değerli içerik.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
