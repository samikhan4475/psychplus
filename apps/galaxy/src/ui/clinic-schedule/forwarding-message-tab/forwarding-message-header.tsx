import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddForwardingButton } from './add-forwarding-button'

const ForwardingMessageHeader = () => {
  return (
    <TabContentHeading
      title="Forwarding Message"
      className="border-white flex-1"
    >
      <Flex flexGrow="1" justify="end" align="center">
        <AddForwardingButton />
      </Flex>
    </TabContentHeading>
  )
}

export { ForwardingMessageHeader }
