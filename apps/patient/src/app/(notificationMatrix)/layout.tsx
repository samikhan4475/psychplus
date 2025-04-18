import '../(portal)/base.css'
import { type Metadata } from 'next'
import { Josefin_Sans, Spectral } from 'next/font/google'
import { cn } from '@psychplus-v2/utils'
import { Flex, Theme } from '@radix-ui/themes'
import { AnonHeader } from '@/components-v2'
import { ToastProvider } from '@/providers'

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={cn(spectral.variable, josefin.variable)}>
      <body>
        <ToastProvider>
          <Theme accentColor="blue" radius="full" asChild>
            <Flex
              direction="column"
              height="100%"
              width="100%"
              className="overflow-y-auto"
            >
              <AnonHeader />
              <Flex className="my-[var(--header-height)] flex-1">
                {children}
              </Flex>
            </Flex>
          </Theme>
        </ToastProvider>
      </body>
    </html>
  )
}

export default RootLayout
