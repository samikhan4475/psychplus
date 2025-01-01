import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { NavLogo } from '@/components'
import { getAuthCookies } from '@/utils/auth'
import { AddPatient } from '../patient/add-patient'
import { AddVisit } from '../visit/add-visit'
import { InboxLink } from './inbox-link'
import { NavigationLinks } from './navigation-links'
import { NavigationTabs } from './navigation-tabs'
import { PatientSearchInput } from './patient-search-input'
import { UserDropdownMenu } from './user-dropdown-menu'

const Header = () => {
  const auth = getAuthCookies()!

  return (
    <>
      <header className="bg-white p-2">
        <Flex align="center" justify="between" px="5">
          <NavLogo />
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
              <Text weight="medium" size="1">
                Mercy Hospital
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
        <Flex align="center" gap="1">
          <PatientSearchInput />
          <InboxLink href="/secure-messages" label="Messages" />
        </Flex>
      </Flex>
      <NavigationTabs />
    </>
  )
}

export { Header }
