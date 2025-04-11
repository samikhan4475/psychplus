'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { NotificationItem } from '../../types'
import { getPurposeCodeIconPath, getTimeAgo } from '../utils'

interface NotificationCardProps extends NotificationItem {
  onCancel?: () => void
  onConfirm?: () => void
  className?: string
  confirmLabel?: string
  cancelLabel?: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  purposeCode,
  message,
  createdOn,
  id,
  onConfirm,
  cancelLabel,
  confirmLabel,
  onCancel,
  className,
}) => {
  const iconPath = getPurposeCodeIconPath(purposeCode)

  return (
    <Flex
      className={cn(
        `min-w-56 mx-2 items-start gap-x-4 border-b border-b-gray-4 p-3`,
        className,
      )}
    >
      <Image
        src={iconPath}
        width={40}
        height={40}
        alt={`${purposeCode}_${id}`}
      />

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
