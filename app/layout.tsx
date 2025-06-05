import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A.M | OCR-Translator',
  description: 'A.M x GCP',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
