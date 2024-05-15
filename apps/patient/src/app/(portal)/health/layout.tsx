'use client'

import { Box, Flex } from '@radix-ui/themes'
import {
  AlertTriangleIcon,
  FlaskConicalIcon,
  HeartPulseIcon,
  PillIcon,
  StoreIcon,
} from 'lucide-react'
import { NavigationSideMenu, ViewContainer } from '@/components-v2'

const NAV_LINKS = [
  {
    href: '/health/medications',
    label: 'Medications',
    Icon: PillIcon,
  },
  // {
  //   href: '/health/lab-results',
  //   label: 'Lab Results',
  //   Icon: FlaskConicalIcon,
  // },
  // {
  //   href: '/health/vitals',
  //   label: 'Vitals',
  //   Icon: HeartPulseIcon,
  // },
  // {
  //   href: '/health/allergies',
  //   label: 'Allergies',
  //   Icon: AlertTriangleIcon,
  // },
  // {
  //   href: '/health/pharmacy',
  //   label: 'Pharmacy',
  //   Icon: StoreIcon,
  // },
]

const HealthLayout = ({ children }: React.PropsWithChildren) => (
  <ViewContainer className="xs:px-5">
    <Flex align="start" gap="5">
      <NavigationSideMenu heading="Health" links={NAV_LINKS} />
      <Box className="min-w-0 flex-1">{children}</Box>
    </Flex>
  </ViewContainer>
)

export default HealthLayout
