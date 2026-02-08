import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ServiceWorkerInit } from '@/components/service-worker-init'
import { OfflineStatus } from '@/components/offline-status'

import './globals.css'
<link rel="icon" href="data:;base64,iVBORw0KGgo="></link>

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Noodules - Learn Parasites in 3D',
  description: 'Interactive 3D parasite learning platform for biomedical students',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0088FF',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning on html is recommended by Next.js
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        // This stops extensions like ColorZilla (cz-shortcut-listen) from breaking hydration
        suppressHydrationWarning
      >
        <ServiceWorkerInit />
        <OfflineStatus />
        {children}
      </body>
    </html>
  )
}