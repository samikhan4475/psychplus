'use client'

import { Box, Flex } from '@radix-ui/themes'
import {
  RadioIcon,
  ScaleIcon,
  Settings2Icon,
  ShieldPlusIcon,
  UserCircle,
} from 'lucide-react'
import { NavigationSideMenu, ViewContainer } from '@/components-v2'

const NAV_LINKS = [
  {
    href: '/account/profile',
    label: 'Profile',
    Icon: UserCircle,
  },
  // {
  //   href: '/account/activity',
  //   label: 'Activity',
  //   Icon: RadioIcon,
  // },
  // {
  //   href: '/account/preferences',
  //   label: 'Preferences',
  //   Icon: Settings2Icon,
  // },
  {
    href: '/account/security',
    label: 'Security',
    Icon: ShieldPlusIcon,
  },
  // {
  //   href: '/account/policies',
  //   label: 'Policies & Consent',
  //   Icon: ScaleIcon,
  // },
]

const AccountLayout = ({ children }: React.PropsWithChildren) => (
  <ViewContainer className="max-w-[1100px] xs:px-5">
    <Flex gap="5">
      <NavigationSideMenu heading="Account" links={NAV_LINKS} />
      <Box className="min-w-0 flex-1">{children}</Box>
    </Flex>
  </ViewContainer>
)

export default AccountLayout
