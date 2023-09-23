import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Created by Amrit Kuikel',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
