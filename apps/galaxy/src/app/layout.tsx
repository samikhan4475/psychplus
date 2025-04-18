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
import { getFeatureFlags } from '@/api/get-feature-flags'
import { getUserType } from '@/api/get-user-type'
import { UserSessionRefresher } from '@/components'
import {
  CODESETS,
  GOOGLE_MAPS_API_KEY,
  SCRIPTSURE_BASE_APPLICATION_URL,
  STRIPE_PUBLISHABLE_KEY,
  WEBSOCKETSERVICE_URL,
} from '@/constants'
import { WebSocketProvider } from '@/providers/websocket-provider'
import { StoreProvider } from '@/store'
import { RecordStatus } from '@/types/feature-flag'
import { PendingClinicSchedule } from '@/ui/clinic-schedule/dialogs/pending-clinic-schedule'
import { Header } from '@/ui/header'
import { LockScreenProvider } from '@/ui/lock-screen-context'
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
          position="top-center"
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
            {auth ? (
              <>
                <WebSocketProvider>
                  <LockScreenProvider>{children}</LockScreenProvider>
                  <PendingClinicSchedule />
                </WebSocketProvider>
              </>
            ) : (
              children
            )}
          </Flex>
        </Theme>
      </body>
    </html>
  )

  if (auth) {
    const CODESETLIST = Object.entries(CODESETS).map(([, value]) => value)
    const [codesets, permissions, user, staffResource, featureFlags] =
      await Promise.all([
        getCodesets(CODESETLIST),
        getUserPermissions(),
        getLoggedInUser(),
        getStaffResource(),
        getFeatureFlags(),
      ])

    const userType = await getUserType(`${user.id}`)
    const constants = {
      googleApiKey: GOOGLE_MAPS_API_KEY,
      stripeApiKey: STRIPE_PUBLISHABLE_KEY,
      scriptsureBaseApplicationUrl: SCRIPTSURE_BASE_APPLICATION_URL,
      webSocketUrl: WEBSOCKETSERVICE_URL,
    }

    return (
      <StoreProvider
        staffResource={staffResource}
        user={{ ...user, staffId: userType.resourceId }}
        permissions={permissions}
        codesets={codesets}
        constants={constants}
        featureFlags={featureFlags.data}
      >
        <UserSessionRefresher
          redirectUrl="/login"
          expiry={auth.accessTokenExpiry}
          requireAuth
        />
        {content}
      </StoreProvider>
    )
  }

  return content
}

export default RootLayout
