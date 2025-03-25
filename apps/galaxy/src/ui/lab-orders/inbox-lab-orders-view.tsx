
import { Flex } from '@radix-ui/themes'
import { InboxLabOrderWidget } from './lab-order-results-widget/inbox-lab-orders-widget'

const InboxLabOrder = () => {
  return (
    <Flex direction="column" width="100%">
        <InboxLabOrderWidget />
    </Flex>
  )
}


export { InboxLabOrder }
