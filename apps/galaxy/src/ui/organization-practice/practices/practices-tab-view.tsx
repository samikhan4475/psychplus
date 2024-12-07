import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'

const PracticesTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Practices" />
    </Flex>
  )
}

export { PracticesTabView }
