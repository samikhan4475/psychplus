'use client'

import NextLink from 'next/link'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import {
  LogOutIcon,
  MessageCircleQuestionIcon,
  UserIcon,
  type LucideIcon,
} from 'lucide-react'
import { logoutAction } from '@/actions'
import type { User } from '@/types'
import { getUserInitials } from '@/utils'

interface UserDropdownMenuProps {
  user: User
}

const UserDropdownMenu = ({ user }: UserDropdownMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="hidden sm:block">
        <Flex className="!flex cursor-pointer items-center gap-1 rounded-4 border border-[#DDDDE3] px-2 py-1">
          <button className="rounded-full focus:outline-accent-9">
            <Avatar
              src={undefined}
              fallback={getUserInitials(user)}
              radius="full"
              size="2"
              alt=""
              className="hover:bg-pp-bg-accent transition-colors duration-200"
              highContrast
            />
          </button>
          <Text weight="medium" size="1">
            {`${user.firstName} ${user.lastName}, ${user.honors}`}
          </Text>
          <TriangleDownIcon />
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        size="1"
        align="end"
        className="rounded-1 px-1 pb-1 shadow-3 [&_.rt-DropdownMenuViewport]:p-0"
      >
        <Flex direction="column" px="2" pt="1">
          <Text className="text-[14px] text-accent-12">{`${user.firstName} ${user.lastName}, ${user.honors}`}</Text>
          <Text className="-mt-1 text-[13px] text-gray-11">{user.email}</Text>
        </Flex>
        <DropdownMenu.Separator className="m-1" />
        <NextLink href="#">
          <MenuItem Icon={MessageCircleQuestionIcon}>Help</MenuItem>
        </NextLink>
        <DropdownMenu.Separator className="m-1" />
        <MenuItem
          Icon={LogOutIcon}
          onClick={() => {
            localStorage.removeItem('p+-provider-app')
            logoutAction()
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
    className="data-[highlighted]:bg-pp-bg-accent flex items-center justify-start gap-2 p-2 transition-colors data-[highlighted]:text-gray-12"
  >
    {Icon ? (
      <Icon
        width={16}
        height={16}
        strokeWidth={1.5}
        fill="white"
        className="text-accent-12"
      />
    ) : null}
    <Text className="text-[12px]">{children}</Text>
  </DropdownMenu.Item>
)

export { UserDropdownMenu }
