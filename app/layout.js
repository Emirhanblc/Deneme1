import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '../components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog - Sistem Yönetimi ve Web Backend',
  description: 'Production ortamlarında karşılaştığım sorunları ve çözümlerini paylaşıyorum. Sistem yönetimi, backend geliştirme ve güvenlik üzerine teknik yazılar.',
  keywords: 'sistem yönetimi, backend geliştirme, linux, devops, güvenlik',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Blog - Sistem Yönetimi ve Web Backend',
    description: 'Production ortamlarında karşılaştığım sorunları ve çözümlerini paylaşıyorum.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
