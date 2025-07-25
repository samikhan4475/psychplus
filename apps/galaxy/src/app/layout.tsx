import './base.css'
import { type Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Flex, Text, Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import { getCodesets, getStaffResource, getUserPermissions } from '@/api'
import { getFeatureFlags } from '@/api/get-feature-flags'
import { UserSessionRefresher } from '@/components'
import { MiniPlayer } from '@/components/mini-player-client'
import { WebSocketConnector } from '@/components/websocket-connector-client'
import {
  CODESETS,
  GOOGLE_MAPS_API_KEY,
  SCRIPTSURE_BASE_APPLICATION_URL,
  STRIPE_PUBLISHABLE_KEY,
  WEBSOCKETSERVICE_URL,
} from '@/constants'
import { StoreProvider } from '@/store'
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
            error: {
              style: {
                wordBreak: 'break-word',
              },
            },
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
                <WebSocketConnector />
                <LockScreenProvider>{children}</LockScreenProvider>
                <MiniPlayer />
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
    try {
      const CODESETLIST = Object.entries(CODESETS).map(([, value]) => value)
      const [codesets, permissions, staffResource, featureFlags] =
        await Promise.all([
          getCodesets(CODESETLIST),
          getUserPermissions(),
          getStaffResource(),
          getFeatureFlags(),
        ])

      const constants = {
        googleApiKey: GOOGLE_MAPS_API_KEY,
        stripeApiKey: STRIPE_PUBLISHABLE_KEY,
        scriptsureBaseApplicationUrl: SCRIPTSURE_BASE_APPLICATION_URL,
        webSocketUrl: WEBSOCKETSERVICE_URL,
      }

      return (
        <StoreProvider
          staffResource={staffResource}
          user={{
            id: Number(staffResource?.userId),
            username: staffResource?.contactInfo?.email,
            legalName: staffResource?.legalName,
            userRoleCode: `${staffResource?.userRoleCode}`,
            contactInfo: staffResource?.contactInfo,
            staffId: Number(staffResource?.id),
          }}
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
    } catch (err) {
      console.error('Failed to load layout data:', err)

      return (
        <html lang="en" className={cn(josefin.variable)}>
          <body>
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            <Theme
              accentColor="blue"
              radius="medium"
              className="flex h-full w-full flex-col"
            >
              {/* <Header /> */}
              <Flex
                direction="column"
                className="text-red-600 flex-1 items-center justify-center gap-4 overflow-y-auto p-4"
              >
                <Flex
                  direction="column"
                  align="center"
                  gap="3"
                  className="w-full max-w-3xl"
                >
                  <Text size="4" weight="bold" color="red">
                    Error:
                  </Text>

                  <Text
                    as="span"
                    size="2"
                    className="bg-red-50 border-red-200 text-red-800 rounded max-h-[400px] w-full max-w-full overflow-auto whitespace-pre-wrap border p-4 text-center"
                  >
                    {err instanceof Error
                      ? err?.message || err.stack
                      : String(err)}
                  </Text>

                  <Text size="2" color="gray">
                    Something went wrong while loading. Please reload the page.
                  </Text>
                </Flex>
              </Flex>
            </Theme>
          </body>
        </html>
      )
    }
  }

  return content
}

export default RootLayout
