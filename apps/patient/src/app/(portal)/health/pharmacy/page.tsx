import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const PharmacyPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Pharmacy</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Pharmacy" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default PharmacyPage
