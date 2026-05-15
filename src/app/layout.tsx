import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parfum-Craft | Lab Digital',
  description: 'SaaS Edukasi & Formulasi Parfum Angkatan 8',
  icons: {
    icon: '/logonya.png', // Pastikan file ini ada di folder /public
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body style={{ backgroundColor: '#F0F9FF', margin: 0, fontFamily: 'sans-serif' }}>
        {/* Navbar tidak perlu di sini jika sudah ada di dashboard page.tsx */}
        <main>{children}</main>
      </body>
    </html>
  )
}
