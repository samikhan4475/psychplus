import { getCodesets, getIsFeatureFlagEnabled, getProfile } from '@/api'
import { FeatureFlags } from '@/constants'
import { ScheduleAppointmentButton } from '@/features/appointments/search'
import { NotificationPopover } from '@/features/notifications'
import { User } from '@psychplus-v2/auth'
import { PsychPlusNavLogo } from '@psychplus-v2/components'
import { CODESETS } from '@psychplus-v2/constants'
import { STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { Container, Flex } from '@radix-ui/themes'
import { NavigationMenu } from './navigation-menu'
import { ResponsiveMenu } from './responsive-menu'
import { ResponsiveMenuToggle } from './responsive-menu-toggle'
import { ScrollAlert } from './scroll-alert'
import { UserDropdownMenu } from './user-dropdown-menu'

const Header = async () => {
  const profileResponse = await getProfile()
  const notificationPopoverFlagEnabled = await getIsFeatureFlagEnabled(
    FeatureFlags.ehr13738PatientPortalNotifications,
  )
  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  const profile = profileResponse.data
  const user: User = {
    userId: String(profile.id),
    firstName: profile.legalName.firstName,
    lastName: profile.legalName.lastName,
    email: profile.contactDetails.email,
  }

  const codesets = await getCodesets([CODESETS.UsStates])
  return (
    <>
      <header className="bg-white fixed top-0 z-50 w-full border border-transparent border-b-gray-6">
        <Container px={{ initial: '2', sm: '5' }}>
          <Flex
            height="100%"
            align="center"
            justify="between"
            className="h-[var(--header-height)]"
          >
            <PsychPlusNavLogo responsive />
            <ScrollAlert />
            <Flex align="center" gap="3">
              <NavigationMenu />
              <ScheduleAppointmentButton
                size={{ initial: '2', md: '3' }}
                className="hidden sm:block"
              />
              {notificationPopoverFlagEnabled && <NotificationPopover />}
              <UserDropdownMenu user={user} />
              <ResponsiveMenuToggle />
            </Flex>
          </Flex>
        </Container>
      </header>
      <ResponsiveMenu
        stripeApiKey={STRIPE_PUBLISHABLE_KEY}
        user={user}
        codesets={codesets}
      />
    </>
  )
}

export { Header }
