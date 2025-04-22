import { TabContentHeading } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'

const LabOrdersHeader = ({ onRefresh }: { onRefresh: () => void }) => {
  return (
    <TabContentHeading title="Lab Orders">
      <AddLabOrdersButton onRefresh={onRefresh} />
    </TabContentHeading>
  )
}

export { LabOrdersHeader }
