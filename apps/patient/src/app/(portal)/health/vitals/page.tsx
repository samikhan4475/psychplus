import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const VitalsPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Vitals</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Vitals" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default VitalsPage
