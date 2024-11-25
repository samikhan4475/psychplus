import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'

const LabOrdersHeader = () => {
  return (
    <TabContentHeading title="Lab Orders">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <AddLabOrdersButton />
      </Flex>
    </TabContentHeading>
  )
}

export { LabOrdersHeader }
