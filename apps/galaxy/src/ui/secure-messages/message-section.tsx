import React, { useMemo, useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ComposeNewEmail } from './compose-email/compose-new-email-template'
import { EmailPlaceHolder } from './compose-email/email-placeholder'
import { MessageHeader } from './message-header'
import { SecureMessagesTabs } from './secure-messages-tabs'
import { ActiveComponent } from './types'

const MessageSection = () => {
  const [activeComponent, setActiveComponent] = useState(
    ActiveComponent.NEW_EMAIL,
  )

  const renderEmailBody = useMemo(() => {
    if (activeComponent === ActiveComponent.NEW_EMAIL)
      return <EmailPlaceHolder setActiveComponent={setActiveComponent} />
    else return <ComposeNewEmail setActiveComponent={setActiveComponent} />
  }, [activeComponent])

  return (
    <Flex className="border-pp-gray-2 border-t">
      <Flex
        className="border-pp-gray-2 h-[100vh] w-[42%]  border-r pr-1 pt-1"
        direction="column"
      >
        <MessageHeader setActiveComponent={setActiveComponent} />
        <SecureMessagesTabs />
      </Flex>
      <Box className="w-[60%] ">{renderEmailBody}</Box>
    </Flex>
  )
}

export { MessageSection }
