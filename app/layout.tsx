import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Chivo_Mono } from 'next/font/google'
import { Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './global.css'

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
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
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
            defaultMenuCollapseLevel: 1,
          }}
          navbar={
            <Navbar
              logo={<span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Grails API</span>}
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
