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
    label: 'All Referrals',
    href: '/widgets/all-referrals-list',
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
    label: 'OTP Dialog',
    href: '/widgets/otp-dialog',
  },
  {
    label: 'Patient Lookup',
    href: '/widgets/patient-lookup',
  },
  {
    label: 'Link Account',
    href: '/widgets/link-account',
  },
  {
    label: 'Patient Relationship',
    href: '/widgets/patient-relationship',
  },
  {
    label: 'Add Relationship',
    href: '/widgets/add-relationship',
  },
  {
    label: 'Patient Preferred Partners',
    href: '/widgets/patient-preferred-partners',
  },
  {
    label: 'Capture Image',
    href: '/widgets/image-capture',
  },
  {
    label: 'Patient Information',
    href: '/widgets/patient-information',
  },
  {
    label: 'Patient History',
    href: '/widgets/patient-history',
  },
  {
    label: 'Fee Schedules',
    href: '/widgets/fee-schedules',
  },
  {
    label: 'Schedule Appointment Dialog',
    href: '/widgets/schedule-appointment-dialog',
  },
  {
    label: 'Schedule Appointment',
    href: '/widgets/schedule-appointment-list',
  },
  {
    label: 'Preffered Partners',
    href: '/widgets/preferred-partners-list',
  },
  {
    label: 'Add Template',
    href: '/widgets/add-template',
  },
  {
    label: 'Edit Template',
    href: '/widgets/edit-template',
  },
  {
    label: 'Reports',
    href: '/widgets/reports',
  },
  {
    label: 'Coding POS',
    href: '/widgets/coding-pos',
  },
  {
    label: 'Coding',
    href: '/widgets/coding',
  },
  {
    label: 'Claim',
    href: '/widgets/claim',
  },
  {
    label: 'Clinic',
    href: '/widgets/clinic',
  },
  {
    label: 'Management - Users',
    href: '/widgets/management-users',
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
      <Box className="grow">
        <Flex direction="column" px="8" py="8">
          {children}
        </Flex>
      </Box>
    </Flex>
  )
}

export default WidgetsLayout
