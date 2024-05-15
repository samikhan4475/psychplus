import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const LabResultsPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Lab Results</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Lab Results" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default LabResultsPage
