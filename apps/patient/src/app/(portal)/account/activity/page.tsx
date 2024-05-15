import { Box, Flex } from '@radix-ui/themes'
import { FeatureCard, FeatureContainer, FeatureHeading } from '@/components-v2'

const ActivityPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Activity</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Recent Activity">
          <Box>...</Box>
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default ActivityPage
