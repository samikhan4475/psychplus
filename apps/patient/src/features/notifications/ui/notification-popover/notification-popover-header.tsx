import React from 'react'
import Image from 'next/image'
import { Button, Flex, Text } from '@radix-ui/themes'

interface NotificationPopoverHeaderProps {
  onMarkAll: () => void
  onClose?: () => void
}

const NotificationPopoverHeader = ({
  onMarkAll,
  onClose,
}: NotificationPopoverHeaderProps) => {
  return (
    <Flex className="items-center justify-between border-b  border-gray-4 px-2 py-3">
      <Text weight="bold" className='text-5 sm:text-3'>
        Notifications
      </Text>
      <Text
        weight="bold"
        className="text-pp-blue-3 ml-auto cursor-pointer hover:underline"
        size="2"
        onClick={onMarkAll}
      >
        Mark all as Read
      </Text>
      {onClose && (
        <Flex
          align="center"
          justify="center"
          className="rounded-full min-w-8 ml-2 min-h-8 border border-[#EDEDF2] shadow-3"
        >
          <Image
            onClick={onClose}
            src="/images/notification-icons/crossicon.svg"
            width={13}
            height={13}
            alt="close_icon"
          />
        </Flex>
      )}
    </Flex>
  )
}

export { NotificationPopoverHeader }
