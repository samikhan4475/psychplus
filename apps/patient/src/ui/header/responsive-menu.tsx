'use client'

import { type User } from '@psychplus-v2/auth'
import { cn, getUserInitials } from '@psychplus-v2/utils'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Separator,
  Text,
} from '@radix-ui/themes'
import { logoutAction } from '@/actions'
import { ScheduleAppointmentButton } from '@/features/appointments/search'
import { ResponsiveMenuLinks } from './responsive-menu-links'
import { useStore } from './store'
import { useCloseMenu } from './use-close-menu'

interface ResponsiveMenuProps {
  user: User
}

const ResponsiveMenu = ({ user }: ResponsiveMenuProps) => {
  useCloseMenu()

  const isOpen = useStore((state) => state.responsiveMenuOpen)

  return (
    <Flex
      position="fixed"
      direction="column"
      className={cn(
        'bottom-0 left-0 right-0 top-[var(--header-height)] z-20 transform overflow-y-auto transition-transform duration-200',
        {
          '-translate-y-full': !isOpen,
        },
      )}
    >
      <nav className="bg-white mb-[var(--header-height)] flex-1">
        <Flex align="center" justify="between" wrap="wrap" px="4" pt="4">
          <Flex align="center" gap="2" mb="4" mr="2">
            <Avatar
              size={{ initial: '4', xs: '5' }}
              fallback={getUserInitials(user)}
              alt=""
              highContrast
            />
            <Flex direction="column">
              <Text className="font-serif text-[20px] font-[600] leading-2 -tracking-[1px] text-accent-12 xs:text-[28px] xs:leading-4">
                {user.firstName}
              </Text>
              <Text className="text-[13px] text-gray-11 xs:text-[15px]">
                {user.email}
              </Text>
            </Flex>
          </Flex>
          <Button
            variant="outline"
            size={{ initial: '1', xs: '2' }}
            radius="medium"
            color="gray"
            className="mb-4 font-[600]"
            tabIndex={isOpen ? undefined : -1}
            onClick={() => {
              logoutAction()
            }}
          >
            Log out
          </Button>
        </Flex>

        <Box>
          <Separator className="w-full" />
        </Box>

        <ResponsiveMenuLinks />
      </nav>
      <Container
        position="fixed"
        px="5"
        className="bg-white bottom-0 w-full border-t border-t-gray-5"
      >
        <Flex py="2" align="center" className="h-[var(--header-height)] w-full">
          <ScheduleAppointmentButton
            className="flex-1"
            size={{ initial: '4' }}
            tabIndex={isOpen ? undefined : -1}
          />
        </Flex>
      </Container>
    </Flex>
  )
}

export { ResponsiveMenu }
