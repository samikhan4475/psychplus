import { TabContentHeading } from '@/components'
import { Flex } from '@radix-ui/themes'

const UsersTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Users" />
    </Flex>
  )
}

export { UsersTabView }
