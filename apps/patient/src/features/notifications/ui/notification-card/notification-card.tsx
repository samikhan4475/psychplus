'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { NotificationItem } from '../../types'
import { useStore as useNotificationStore } from '../store'
import { getPurposeCodeMeta, getTimeAgo, Purpose_Code_Types } from '../utils'

interface NotificationCardProps extends NotificationItem {
  onCancel?: () => void
  className?: string
  popoverToggle?: () => void
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
  onMark,
  cancelLabel,
  onCancel,
  className,
  popoverToggle,
}) => {
  const { iconPath, route, label } = getPurposeCodeMeta(purposeCode)

  const router = useRouter()
  const [isRead, setIsRead] = useState(!!readOn)
  const cardRef = useRef<HTMLDivElement>(null)
  const setIsAssessmentDialogOpen = useNotificationStore(
    (state) => state.setIsDialogOpen,
  )
  const setActiveAssessmentTab = useStore((state) => state.setActiveTab)
  const onRead = async () => {
    if (isRead) return
    setIsRead(true)
    onMark(id)
  }

  const onConfirm = async () => {
    if (route) {
      await onRead()
      onNavigate()
      return
    }

    if (purposeCode === Purpose_Code_Types.Questionnaire) {
      setActiveAssessmentTab(PreCheckinAssessmentTabs.Questionnaire)
      setIsAssessmentDialogOpen(true)
    }
  }

  const onNavigate = () => {
    if (!route) return
    router.push(route)
    popoverToggle && popoverToggle()
  }

  useEffect(() => {
    const node = cardRef.current
    if (!node || isRead) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onRead()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.8 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [isRead])

  return (
    <Flex
      ref={cardRef}
      onClick={async () => {
        await onRead()
        onNavigate()
      }}
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
          {label && (
            <Button onClick={onConfirm} className="bg-pp-blue-3 w-fit" size="2">
              {label}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { NotificationCard }
