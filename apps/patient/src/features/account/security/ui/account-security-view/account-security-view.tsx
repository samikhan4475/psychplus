import { Flex } from '@radix-ui/themes'
import { FeatureContainer, FeatureHeading } from '@/components-v2'
import { LoginCard } from './login-card'

const AccountSecurityView = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Security</FeatureHeading>
      <FeatureContainer>
        <LoginCard />
      </FeatureContainer>
    </Flex>
  )
}

export { AccountSecurityView }
