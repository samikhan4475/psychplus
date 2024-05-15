import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const PoliciesPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Policies & Consent</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Policy & Consent" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default PoliciesPage
