import { type Metadata } from 'next'
import { Josefin_Sans, Spectral } from 'next/font/google'
import { getAuthCookies } from '@psychplus-v2/auth'
import { SessionRefresher } from '@psychplus-v2/auth/components'
import { cn } from '@psychplus-v2/utils'
import { Flex, Theme } from '@radix-ui/themes'
import { ToastProvider } from '@/providers'
import { WebSocketProvider } from '@/providers/websocket-provider'
import { Header } from '@/ui'
import './base.css'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'PsychPlus | Mental Health Care Covered by Your Insurance',
  description: 'Mental health care covered by your insurance',
}

const spectral = Spectral({
  weight: ['200', '300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spectral',
})

const josefin = Josefin_Sans({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
})

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = getAuthCookies()

  const content = (
    <html lang="en" className={cn(spectral.variable, josefin.variable)}>
      <Head>
        {/* Google Tag Manager Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-WL4ZLDTL');`,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-WL4ZLDTL" 
          height="0" 
          width="0" 
          style={{display:"none",visibility:'hidden'}}
          ></iframe>
        </noscript>
        {auth ? (
          <SessionRefresher
            expiry={auth.accessTokenExpiry}
            redirectUrl="/login"
            requireAuth
          />
        ) : null}
        <ToastProvider>
          <WebSocketProvider>
            <Theme accentColor="blue" radius="full" asChild>
              <Flex
                direction="column"
                height="100%"
                width="100%"
                className="overflow-y-auto"
              >
                {auth ? <Header /> : null}
                <Flex
                  className={cn('mt-[var(--header-height)] flex-1', {
                    'mt-0': !auth,
                  })}
                >
                  {children}
                </Flex>
              </Flex>
            </Theme>
          </WebSocketProvider>
        </ToastProvider>
      </body>
    </html>
  )

  return content
}

export default RootLayout
