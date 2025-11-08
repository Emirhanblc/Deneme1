'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/blog', label: 'Yazılar' },
    { href: '/projects', label: 'Projeler' },
    { href: '/glossary', label: 'Sözlük' },
    { href: '/scripts', label: 'Script\'ler' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/contact', label: 'İletişim' },
  ]

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link href="/">Blog</Link>
        </div>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className={isActive(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
