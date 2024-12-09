'use client'

import NextLink from 'next/link'
import { type User } from '@psychplus-v2/auth'
import { getUserInitials } from '@psychplus-v2/utils'
import { Avatar, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { LogOutIcon, UserIcon, type LucideIcon } from 'lucide-react'
import { logoutAction } from '@/actions'

interface UserDropdownMenuProps {
  user: User
}

const UserDropdownMenu = ({ user }: UserDropdownMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="hidden sm:block">
        <button className="rounded-full focus:outline-accent-9">
          <Avatar
            src="/api/patients/self/profileimage" //TODO replace with hasPhoto check
            fallback={getUserInitials(user)}
            radius="full"
            size="4"
            alt=""
            className="transition-colors duration-200 hover:bg-accent-2"
            highContrast
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" align="end" className="rounded-1 shadow-3">
        <Flex direction="column" px="3" py="1">
          <Text className="font-serif text-[20px] -tracking-[1px] text-accent-12">{`${user.firstName} ${user.lastName}`}</Text>
          <Text className="-mt-1 text-[14px] text-gray-11">{user.email}</Text>
        </Flex>
        <DropdownMenu.Separator className="m-1" />
        <NextLink href={'/account/profile'}>
          <MenuItem Icon={UserIcon}>My Account</MenuItem>
        </NextLink>
        {/* <NextLink href="/appointments">
          <MenuItem Icon={CalendarDaysIcon}>Appointments</MenuItem>
        </NextLink> */}
        {/* <NextLink href="#">
          <MenuItem Icon={MessageCircleQuestionIcon}>Support</MenuItem>
        </NextLink> */}
        <DropdownMenu.Separator className="m-1" />
        <MenuItem
          Icon={LogOutIcon}
          onClick={() => {
            logoutAction()
            localStorage.clear()
            sessionStorage.clear()
          }}
        >
          Log out
        </MenuItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

interface MenuItemProps extends React.ComponentProps<typeof DropdownMenu.Item> {
  Icon: LucideIcon
}

const MenuItem = ({ children, Icon, onClick }: MenuItemProps) => (
  <DropdownMenu.Item
    onClick={onClick}
    className="flex items-center justify-start gap-2 py-5 transition-colors data-[highlighted]:bg-accent-2 data-[highlighted]:text-gray-12"
  >
    {Icon ? (
      <Flex
        align="center"
        justify="center"
        className="rounded-full h-[30px] w-[30px] bg-accent-3"
      >
        <Icon
          width={19}
          height={19}
          strokeWidth={1.5}
          fill="white"
          className="text-accent-12"
        />
      </Flex>
    ) : null}
    <Text className="text-[14px]">{children}</Text>
  </DropdownMenu.Item>
)

export { UserDropdownMenu }
