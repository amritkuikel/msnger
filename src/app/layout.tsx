import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import mongooseConnect from './utils/dbconnect'

const rubik = Rubik({ subsets: ['latin'] })
mongooseConnect()

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
