import { Box, Flex, Heading } from '@radix-ui/themes'
import { NavigationMenu, type MenuItem } from '../shared/navigation-menu'

const navMenuItems: MenuItem[] = [
  {
    label: 'User',
    href: '/widgets/user',
  },
  {
    label: 'Patient',
    href: '/widgets/patient',
  },
  {
    label: 'Professional Claim',
    href: '/widgets/professional-claim',
  },
  {
    label: 'Claim Status Configuration',
    href: '/widgets/claim-status-config',
  },
  {
    label: 'Patient Referrals',
    href: '/widgets/patient-referrals-list',
  },
  {
    label: 'Create Referral',
    href: '/widgets/create-referral',
  },
  {
    label: 'Edit Referral',
    href: '/widgets/edit-referral',
  },
  {
    label: 'Patient Lookup',
    href: '/widgets/patient-lookup',
  },
  {
    label: 'Patient Information',
    href: '/widgets/patient-information',
  },
  {
    label: 'Fee Schedules',
    href: '/widgets/fee-schedules',
  },
]

const WidgetsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <Box px="4" pt="4" pb="9">
        <Box px="3" py="2">
          <Heading size="3">Widgets</Heading>
        </Box>
        <Flex direction="column" px="4">
          <NavigationMenu items={navMenuItems} />
        </Flex>
      </Box>
      <Box grow="1">
        <Flex direction="column" px="8" py="8">
          {children}
        </Flex>
      </Box>
    </Flex>
  )
}

export default WidgetsLayout
