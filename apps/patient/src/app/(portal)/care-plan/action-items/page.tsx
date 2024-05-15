import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const ActionItemsPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Action Items</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Action Items" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default ActionItemsPage
