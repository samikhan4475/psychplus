import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { OrganizationPracticesView } from '@/ui/organization-practices'

const PracticesTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Practice" />
      <OrganizationPracticesView isPractices />
    </Flex>
  )
}

export { PracticesTabView }
