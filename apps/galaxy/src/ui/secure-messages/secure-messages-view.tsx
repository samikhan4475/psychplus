'use client'

import { useMemo, useRef } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ComposeNewEmail } from './email/compose-message/compose-new-email-template'
import { EmailPlaceHolder } from './email/email-placeholder'
import { ViewMessage } from './email/view-message'
import { MessageHeader } from './message-header'
import { SecureMessagesTable } from './secure-message-table'
import { useStore } from './store'
import { ActiveComponent } from './types'

const SecureMessagesView = ({
  activeTab,
  tab,
}: {
  activeTab: string
  tab: string
}) => {
  const { activeComponent } = useStore((state) => ({
    activeComponent: state.activeComponent,
  }))
  const boxRef = useRef<HTMLDivElement>(null)
  const renderEmailBody = useMemo(() => {
    if (activeComponent === ActiveComponent.NEW_EMAIL_PLACEHOLDER)
      return <EmailPlaceHolder />
    else if (
      activeComponent === ActiveComponent.PREVIEW_EMAIL ||
      activeComponent === ActiveComponent.REPLY ||
      activeComponent === ActiveComponent.REPLY_TO_ALL ||
      activeComponent === ActiveComponent.FORWARD
    )
      return <ViewMessage boxRef={boxRef} isActiveTab={activeTab === tab} />
    else
      return (
        <Flex direction="column" className="mx-4 mb-4 h-full">
          <EmailPlaceHolder showNewMessageButton={false} />
          <ComposeNewEmail isActiveTab={activeTab === tab} />
        </Flex>
      )
  }, [activeComponent])

  return (
    <Flex className="border-pp-gray-2 bg-white h-[calc(100vh-136px)]  w-full">
      <Flex
        className="border-pp-gray-2 w-[42%] overflow-auto  border-r pt-1"
        direction="column"
      >
        <MessageHeader tab={activeTab} />
        <SecureMessagesTable />
      </Flex>
      <Box className="w-[60%] overflow-auto">{renderEmailBody}</Box>
    </Flex>
  )
}

export { SecureMessagesView }
