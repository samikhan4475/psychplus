import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { LeftIcon } from '@/components/icons'
import { cn } from '@/utils'
import { useStore } from '../store'
import { ActiveComponent } from '../types'
import { MessageHeading } from './message-heading'

const NewMessageHeader = () => {
  const {
    activeComponent,
    activeTab,
    setActiveComponent,
    setPreviewSecureMessage,
  } = useStore((state) => state)
  const noComposeEmail = activeComponent !== ActiveComponent.COMPOSE_MAIL
  const closeMessageEditor = () => {
    setPreviewSecureMessage({ activeTab, secureMessage: null })
    setActiveComponent(ActiveComponent.NEW_EMAIL)
  }
  return (
    <Flex
      className="bg-pp-table-subRows h-[40px] w-full"
      justify="between"
      align="center"
    >
      <Flex className={cn(noComposeEmail && 'pl-4')} align="center">
        {noComposeEmail && (
          <LeftIcon
            width={12}
            className="cursor-pointer"
            height={12}
            onClick={closeMessageEditor}
          />
        )}
        <MessageHeading />
      </Flex>

      <Cross1Icon
        className="text-pp-text-sub pr-6"
        width="40"
        height="40"
        onClick={closeMessageEditor}
      />
    </Flex>
  )
}

export { NewMessageHeader }
