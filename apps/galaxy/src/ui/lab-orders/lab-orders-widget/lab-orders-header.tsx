import { TabContentHeading } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'
interface LabOrdersHeaderProps {
  onRefresh: () => void;
}

const LabOrdersHeader = ({ onRefresh }: LabOrdersHeaderProps) => {
  return (
    <TabContentHeading title="Lab Orders">
      <AddLabOrdersButton onRefresh={onRefresh} />
    </TabContentHeading>
  )
}

export { LabOrdersHeader }
