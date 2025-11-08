import { Inter, JetBrains_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import Layout from '../components/Layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`dark ${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
