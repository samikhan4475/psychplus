'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddForwardingButton } from './add-forwarding-button'

interface ForwardingMessageHeaderProps {
  userId: number
}
const ForwardingMessageHeader = ({ userId }: ForwardingMessageHeaderProps) => {
  return (
    <TabContentHeading
      title="Forwarding Message"
      className="border-white flex-1"
    >
      <Flex flexGrow="1" justify="end" align="center">
        <AddForwardingButton userId={userId} />
      </Flex>
    </TabContentHeading>
  )
}

export { ForwardingMessageHeader }
