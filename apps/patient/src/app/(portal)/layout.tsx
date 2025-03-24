import { type Metadata } from 'next'
import { Josefin_Sans, Spectral } from 'next/font/google'
import { getAuthCookies } from '@psychplus-v2/auth'
import { SessionRefresher } from '@psychplus-v2/auth/components'
import { cn } from '@psychplus-v2/utils'
import { Flex, Theme } from '@radix-ui/themes'
import { ToastProvider } from '@/providers'
import { Header } from '@/ui'
import './base.css'

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
      <body>
        {auth ? (
          <SessionRefresher
            expiry={auth.accessTokenExpiry}
            redirectUrl="/login"
            requireAuth
          />
        ) : null}
        <ToastProvider>
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
        </ToastProvider>
      </body>
    </html>
  )

  return content
}

export default RootLayout
