import React, { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ComposeNewEmail, EmailPlaceHolder } from './email'
import { ReviewEmail } from './email/view-message'
import { MessageHeader } from './message-header'
import { SecureMessagesTabs } from './secure-messages-tabs'
import { useStore } from './store'
import { ActiveComponent } from './types'

const MessageSection = () => {
  const { activeComponent } = useStore((state) => state)
  const renderEmailBody = useMemo(() => {
    if (activeComponent === ActiveComponent.NEW_EMAIL)
      return <EmailPlaceHolder />
    else if (activeComponent === ActiveComponent.PREVIEW_EMAIL)
      return <ReviewEmail />
    else return <ComposeNewEmail />
  }, [activeComponent])

  return (
    <Flex className="border-pp-gray-2 border-t">
      <Flex
        className="border-pp-gray-2 h-[100vh] w-[42%]  border-r pr-1 pt-1"
        direction="column"
      >
        <MessageHeader />
        <SecureMessagesTabs />
      </Flex>
      <Box className="w-[60%] ">{renderEmailBody}</Box>
    </Flex>
  )
}

export { MessageSection }
