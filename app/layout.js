import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '../components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistem Yönetimi & Web Backend Blogu',
  description:
    'Linux, network, sistem yönetimi ve web backend üzerine teknik makaleler, scriptler ve projeler.',
  keywords: 'sistem yönetimi, backend geliştirme, linux, devops, güvenlik',
  authors: [{ name: 'Emirhan Balcı' }],
  openGraph: {
    title: 'Sistem Yönetimi & Web Backend Blogu',
    description:
      'Linux, network, sistem yönetimi ve web backend üzerine teknik makaleler, scriptler ve projeler.',
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
