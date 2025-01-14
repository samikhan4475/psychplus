import { Flex } from '@radix-ui/themes'
import { ForwardingMessageHeader } from './forwarding-message-header'
import { ForwardingMessageFilterForm } from './forwarding-message-filter-form'
import { ForwardingMessageTable } from './forwarding-message-table'


const ForwardingMessageTab = () => {
  return (
    <Flex flexGrow="1" direction='column'>
      <ForwardingMessageHeader />
      <ForwardingMessageFilterForm />
      <ForwardingMessageTable />
    </Flex>
  )
}

export { ForwardingMessageTab }
