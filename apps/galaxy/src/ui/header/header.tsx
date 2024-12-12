import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { NavLogo } from '@/components'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { getAuthCookies } from '@/utils/auth'
import { AddPatientDialog } from '../patient-lookup/add-patient-dialog/add-patient-dialog'
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
            <AddPatientDialog googleApiKey={GOOGLE_MAPS_API_KEY}>
              <Button
                variant="outline"
                size="2"
                color="gray"
                highContrast
                className="pb-[14px] pt-[14px]"
              >
                <PlusCircledIcon />
                Patient
              </Button>
            </AddPatientDialog>
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
