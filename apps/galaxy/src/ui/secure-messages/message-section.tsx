import React, { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { EmailPlaceHolder } from './email-placeholder'
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
  }, [activeComponent])

  return (
    <>
      <Flex
        className="border-pp-gray-2 h-[100vh] w-[42%]  border-r pr-1 pt-2"
        direction="column"
      >
        <MessageHeader />
        <Flex className=" p-2">
          <SecureMessagesTabs />
        </Flex>
      </Flex>
      <Flex className="w-[60%] ">{renderEmailBody}</Flex>
    </>
  )
}

export { MessageSection }
