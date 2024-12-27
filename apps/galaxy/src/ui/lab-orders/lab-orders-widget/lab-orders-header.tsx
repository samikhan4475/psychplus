import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddLabOrderView } from '../add-lab-order'

const LabOrdersHeader = () => {
  return (
    <TabContentHeading title="Lab Orders">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <AddLabOrderView />
      </Flex>
    </TabContentHeading>
  )
}

export { LabOrdersHeader }
