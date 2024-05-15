import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const VisitNotesPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Visit Notes</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Visit Notes" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default VisitNotesPage
