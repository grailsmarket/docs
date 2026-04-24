import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Chivo_Mono } from 'next/font/google'
import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './global.css'
import { Head } from 'nextra/components'
import Image from 'next/image'

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'Grails API Documentation',
    template: '%s | Grails API',
  },
  description: 'API documentation for Grails: ENS Manager & Market',
  authors: [{ name: 'Grails Market', url: 'https://grails.app' }],
  openGraph: {
    title: 'Grails API Documentation',
    description: 'API documentation for Grails: ENS Manager & Market',
    images: ['https://grails.app/previews/home.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grails API Documentation',
    description: 'API documentation for Grails: ENS Manager & Market',
    images: ['https://grails.app/previews/home.jpeg'],
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <Head
        color={{
          hue: 30,
          saturation: 100,
          lightness: {
            light: 90,
            dark: 85
          }
        }}
        backgroundColor={{
          dark: '#222222',
          light: '#ffffff',
        }}
      />
      <body className={chivoMono.className}>
        <Layout
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/grailsmarket/docs/blob/main"
          editLink="Edit this page on GitHub"
          feedback={{ content: 'Report an issue →' }}
          darkMode={false}
          nextThemes={{
            defaultTheme: 'dark',
            forcedTheme: 'dark',
            storageKey: 'grails-docs-theme',
          }}
          sidebar={{
            defaultMenuCollapseLevel: 2,
          }}
          navbar={
            <Navbar
              logo={
                <div className='flex items-center gap-2'>
                  <Image src='https://grails.app/logo.png' alt='Grails Logo' width={22} height={22} />
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Grails API</span>
                </div>
              }
              projectLink="https://github.com/grailsmarket/docs"

            />
          }
          footer={<div />}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
