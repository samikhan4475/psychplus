import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { NavLogo } from '@/components'
import { getAuthCookies } from '@/utils/auth'
import { InboxLink } from './inbox-link'
import { NavigationLinks } from './navigation-links'
import { NavigationTabs } from './navigation-tabs'
import { PatientSearchInput } from './patient-search-input'
import { UserDropdownMenu } from './user-dropdown-menu'

const Header = () => {
  const auth = getAuthCookies()!

  return (
    <>
      <header className="bg-white">
        <Flex align="center" justify="between" px="5">
          <NavLogo />
          <Flex height="100%" align="center" gap="2">
            <Button variant="outline" size="1" highContrast>
              <PlusCircledIcon />
              Patient
            </Button>
            <Button variant="outline" size="1" highContrast>
              <PlusCircledIcon />
              Visit
            </Button>
            <Button variant="outline" size="1" highContrast>
              Help
            </Button>
            <Flex height="100%" align="center" gap="3" ml="2">
              <Text weight="medium" size="1">
                Mercy Hospital
              </Text>
              <Text weight="medium" size="1">
                John Doe
              </Text>
              <UserDropdownMenu user={auth.user} />
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
        <Flex align="center" gap="3">
          <PatientSearchInput />
          <InboxLink />
        </Flex>
      </Flex>
      <NavigationTabs />
    </>
  )
}

export { Header }
