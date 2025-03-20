import { TabContentHeading } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'

const LabOrdersHeader = () => {
  return (
    <TabContentHeading title="Lab Orders">
      <AddLabOrdersButton />
    </TabContentHeading>
  )
}

export { LabOrdersHeader }
