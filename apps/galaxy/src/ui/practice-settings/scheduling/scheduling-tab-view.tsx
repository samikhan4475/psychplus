import { TabContentHeading } from '@/components'
import { Flex } from '@radix-ui/themes'

const SchedulingTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Scheduling" />
    </Flex>
  )
}

export { SchedulingTabView }
