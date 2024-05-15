import { Flex } from '@radix-ui/themes'
import {
  FeatureCard,
  FeatureContainer,
  FeatureHeading,
  UnderConstruction,
} from '@/components-v2'

const PreferencesPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Preferences</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Preferences" contentClassName="py-10">
          <UnderConstruction />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default PreferencesPage
