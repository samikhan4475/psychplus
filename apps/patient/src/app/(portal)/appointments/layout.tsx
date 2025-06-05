'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex } from '@radix-ui/themes'
import { ShieldPlusIcon, UserCircle } from 'lucide-react'
import { NavigationSideMenu, ViewContainer } from '@/components-v2'

const NAV_LINKS = [
  {
    href: '/appointments/upcoming',
    label: 'Upcoming',
    Icon: UserCircle,
  },
  {
    href: '/appointments/history',
    label: 'History',
    Icon: ShieldPlusIcon,
  },
]

const AppointmentsPage = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()

  return (
    <ViewContainer
      className={cn(
        NAV_LINKS.some((link) => link.href === pathname)
          ? 'max-w-[1100px]'
          : 'py-0',
      )}
    >
      <Flex gap="5">
        {NAV_LINKS.some((link) => link.href === pathname) && (
          <NavigationSideMenu heading="Appointments" links={NAV_LINKS} />
        )}
        <Box className="flex-1">{children}</Box>
      </Flex>
    </ViewContainer>
  )
}

export default AppointmentsPage
