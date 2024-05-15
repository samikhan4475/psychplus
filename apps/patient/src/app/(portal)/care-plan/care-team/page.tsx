import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const CareTeamPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Care Team</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Care Team" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default CareTeamPage
