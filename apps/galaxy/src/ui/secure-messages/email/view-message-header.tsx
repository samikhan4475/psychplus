import React, { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { Text } from 'react-aria-components'
import { ArchiveIcon } from '@/components/icons'
import { useStore } from '../store'
import { ActiveComponent, ActiveComponentProps } from '../types'

const ViewMessageHeader = ({ setActiveComponent }: ActiveComponentProps) => {
  const {
    secureMessages = [],
    previewSecureMessage,
    setPreviewSecureMessage,
  } = useStore((state) => state)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (previewSecureMessage?.id) {
      const findIndex =
        secureMessages.findIndex(
          (item) => item.id === previewSecureMessage.id,
        ) + 1
      setCurrentPage(findIndex)
    }
  }, [secureMessages, previewSecureMessage])

  const nextMessageHandler = () => {
    if (currentPage < secureMessages.length) {
      const nextMessage = secureMessages[currentPage]
      if (nextMessage) {
        setPreviewSecureMessage(nextMessage)
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const previousMessageHandler = () => {
    if (currentPage > 1) {
      const prevMessage = secureMessages[currentPage - 2]
      if (prevMessage) {
        setPreviewSecureMessage(prevMessage)
        setCurrentPage(currentPage - 1)
      }
    }
  }

  return (
    <Flex
      className="bg-pp-table-subRows  h-8 w-full"
      justify="between"
      align="center"
    >
      <Flex align="center" gap="4" className="pl-6">
        <ArrowLeftIcon
          onClick={() => setActiveComponent(ActiveComponent.NEW_EMAIL)}
          className="text-pp-gray-1 cursor-pointer"
        />
        <ArchiveIcon
          width={16}
          height={16}
          fill="#60646C"
          className="text-pp-gray-1 cursor-pointer"
        />
        <EnvelopeClosedIcon className="text-pp-gray-1 cursor-pointer" />
      </Flex>
      <Flex align="center" gap="4" className="pr-6">
        <Text>
          {currentPage} of {secureMessages.length}
        </Text>
        <Flex>
          <ChevronLeftIcon
            onClick={previousMessageHandler}
            className="cursor-pointer"
          />
          <ChevronRightIcon
            onClick={nextMessageHandler}
            className="cursor-pointer"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ViewMessageHeader }
