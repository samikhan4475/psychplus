import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { OrganizationPracticesView } from '@/ui/organization-practices'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

const PracticesTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Practice" />
      <OrganizationPracticesView  googleApiKey={GOOGLE_MAPS_API_KEY} isPractices/>
    </Flex>
  )
}

export { PracticesTabView }
