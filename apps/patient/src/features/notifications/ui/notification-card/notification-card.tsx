'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { NotificationItem } from '../../types'
import { getPurposeCodeIconPath, getTimeAgo } from '../utils'

interface NotificationCardProps extends NotificationItem {
  onCancel?: () => void
  onConfirm?: () => void
  className?: string
  confirmLabel?: string
  cancelLabel?: string
  readOn?: string
  onMark: (notificationId: string) => void
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  purposeCode,
  message,
  createdOn,
  readOn,
  id,
  onConfirm,
  onMark,
  cancelLabel,
  confirmLabel,
  onCancel,
  className,
}) => {
  const iconPath = getPurposeCodeIconPath(purposeCode)

  const [isRead, setIsRead] = useState(false)
  const onRead = async () => {
    if (isRead) return
    setIsRead(true)
    onMark(id)
  }

  useEffect(() => {
    setIsRead(!!readOn)
  }, [readOn])

  return (
    <Flex
      onClick={onRead}
      className={cn(
        `min-w-56 bg-white mx-2 items-start gap-x-4 border-b border-b-gray-4 p-3`,
        className,
      )}
    >
      <Box className="relative">
        <Image
          src={iconPath}
          width={40}
          height={40}
          className="min-w-[40px]"
          alt={`${purposeCode}_${id}`}
        />
        {!isRead && (
          <Image
            src="/images/notification-icons/red-dot.svg"
            alt="red-dot"
            width="8"
            height="8"
            className="absolute right-[3px] top-[3px]"
          />
        )}
      </Box>

      <Flex direction="column" className="gap-y-4">
        <Flex direction="column" className="gap-y-1">
          <Text size="2" className="text-[#60646C]" weight="medium">
            {message}
          </Text>
          <Text size="1" className="opacity-85">
            {getTimeAgo(new Date(createdOn))}
          </Text>
        </Flex>
        <Flex className="gap-x-3">
          {cancelLabel && (
            <Button onClick={onCancel} variant="outline" color="gray" size="2">
              {cancelLabel}
            </Button>
          )}
          {confirmLabel && (
            <Button onClick={onConfirm} className="bg-pp-blue-3 w-fit" size="2">
              {confirmLabel}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { NotificationCard }
