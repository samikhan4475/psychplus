import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const AllergiesPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Allergies</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Allergies" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default AllergiesPage
