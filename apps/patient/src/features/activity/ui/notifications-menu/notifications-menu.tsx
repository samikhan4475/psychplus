'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { Box, DropdownMenu, Flex, Separator, Text } from '@radix-ui/themes'
import { BellIcon } from 'lucide-react'
import type { Activity } from '../../types'
import { EmptyNotifications } from './empty-notifications'
import { NewLabResultsNotification } from './new-lab-results-notification'
import { NewMessageNotification } from './new-message-notification'
import { NewRxNotification } from './new-rx-notification'
import { NewVisitNotesNotification } from './new-visit-notes-notification'

interface NotificationsMenuProps {
  data: Activity[]
}

const NotificationsMenu = ({ data }: NotificationsMenuProps) => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => {
    setOpen(false)
  }

  const hasUnreadNotifications = true

  return (
    <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <button className="rounded-full focus:outline-accent-9">
          <Flex
            position="relative"
            align="center"
            justify="center"
            className="rounded-full h-[50px] w-[50px] transition-colors duration-300 hover:bg-gray-2"
          >
            {hasUnreadNotifications ? (
              <Box className="rounded-full absolute right-[16px] top-[13px] h-[8px] w-[8px] bg-red-11" />
            ) : null}
            <BellIcon
              width={24}
              height={24}
              strokeWidth={1.5}
              className="text-accent-12"
            />
            <span className="sr-only">Open notifications menu</span>
          </Flex>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        size="2"
        align="end"
        className="rounded-1 p-0 shadow-3 [&_.rt-DropdownMenuViewport]:p-0"
      >
        {data.length !== 0 ? (
          <Flex direction="column">
            <Box className="w-[275px] xs:w-[300px]">
              {data.map((activity) => (
                <Box key={activity.id} onClick={closeMenu}>
                  {renderNotification(activity)}
                </Box>
              ))}
            </Box>
            <Separator className="w-full" />
            <NextLink href="/account/activity">
              <Flex
                align="center"
                justify="center"
                py="3"
                className="transition-colors hover:bg-accent-2"
                onClick={closeMenu}
              >
                <Text className="text-[12.5px] font-[600] text-accent-12">
                  See all recent activity
                </Text>
              </Flex>
            </NextLink>
          </Flex>
        ) : (
          <EmptyNotifications />
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const renderNotification = (data: Activity) => {
  switch (data.type) {
    case 'new-message':
      return <NewMessageNotification data={data} />
    case 'new-rx':
      return <NewRxNotification data={data} />
    case 'new-lab-results':
      return <NewLabResultsNotification data={data} />
    case 'new-visit-notes':
      return <NewVisitNotesNotification data={data} />
    default:
      return null
  }
}

export { NotificationsMenu }
