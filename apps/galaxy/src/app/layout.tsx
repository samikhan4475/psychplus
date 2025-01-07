import './base.css'
import { type Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Flex, Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import {
  getCodesets,
  getLoggedInUser,
  getStaffResource,
  getUserPermissions,
} from '@/api'
import { getUserType } from '@/api/get-user-type'
import {
  CODESETS,
  GOOGLE_MAPS_API_KEY,
  STRIPE_PUBLISHABLE_KEY,
} from '@/constants'
import { StoreProvider } from '@/store'
import { Header } from '@/ui/header'
import { cn } from '@/utils'
import { getAuthCookies } from '@/utils/auth'

export const metadata: Metadata = {
  title: 'PsychPlus',
  description: 'PsychPlus',
}

const josefin = Josefin_Sans({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
})

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const auth = getAuthCookies()

  const content = (
    <html lang="en" className={cn(josefin.variable)}>
      <body>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
          }}
        />
        <Theme
          accentColor="blue"
          radius="medium"
          className="flex h-full w-full flex-col"
        >
          {auth ? <Header /> : null}
          <Flex direction="column" className="flex-1 overflow-y-auto">
            {children}
          </Flex>
        </Theme>
      </body>
    </html>
  )

  if (auth) {
    const CODESETLIST = Object.entries(CODESETS).map(([, value]) => value)
    const [codesets, permissions, user, staffResource] = await Promise.all([
      getCodesets(CODESETLIST),
      getUserPermissions(),
      getLoggedInUser(),
      getStaffResource(),
    ])
    const userType = await getUserType(`${user.id}`)
    const constants = {
      googleApiKey: GOOGLE_MAPS_API_KEY,
      stripeApiKey: STRIPE_PUBLISHABLE_KEY,
    }

    return (
      <StoreProvider
        staffResource={staffResource}
        user={{ ...user, staffId: userType.resourceId }}
        permissions={permissions}
        codesets={codesets}
        constants={constants}
      >
        {content}
      </StoreProvider>
    )
  }

  return content
}

export default RootLayout
