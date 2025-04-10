import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { getUserInitialInformationAction } from '@/actions/get-users-initial-information'
import { NavLogo } from '@/components'
import { getAuthCookies } from '@/utils/auth'
import { AddPatient } from '../patient/add-patient'
import { AddVisit } from '../visit/add-visit'
import { InboxLink } from './inbox-link'
import { NavigationLinks } from './navigation-links'
import { NavigationTabs } from './navigation-tabs'
import { ScrollAlert } from './scroll-alert'
import { UserDropdownMenu } from './user-dropdown-menu'

const Header = async () => {
  const userInitialInformationResponse = await getUserInitialInformationAction()
  const count =
    userInitialInformationResponse?.state === 'error'
      ? 0
      : userInitialInformationResponse?.data?.inboxTotalCount ?? 0

  return (
    <>
      <header className="bg-white p-2">
        <Flex align="center" justify="between" px="5">
          <NavLogo />
          <ScrollAlert />
          <Flex height="100%" align="center" gap="2">
            <AddPatient>
              <Button
                variant="outline"
                size="2"
                color="gray"
                highContrast
                className="pb-[14px] pt-[14px]"
              >
                <PlusCircledIcon />
                User
              </Button>
            </AddPatient>
            <AddVisit>
              <Button
                variant="outline"
                size="2"
                color="gray"
                highContrast
                className="pb-[14px] pt-[14px]"
              >
                <PlusCircledIcon />
                Visit
              </Button>
            </AddVisit>
            <Flex height="100%" align="center" gap="3" ml="2">
              <UserDropdownMenu />
            </Flex>
          </Flex>
        </Flex>
      </header>
      <Flex
        align="center"
        justify="between"
        py="1"
        px="5"
        className="text-white bg-accent-11"
      >
        <NavigationLinks />
        <InboxLink
          href="/inbox"
          label="Inbox"
          inboxCountTotal={count}
        />
      </Flex>
      <NavigationTabs />
    </>
  )
}

export { Header }
