import { ConfigurationResponse } from '@psychplus-v2/types'
import { Flex } from '@radix-ui/themes'
import { FeatureContainer, FeatureHeading } from '@/components-v2'
import { LoginCard } from './login-card'

const AccountSecurityView = ({
  configuration,
}: {
  configuration: ConfigurationResponse
}) => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Security</FeatureHeading>
      <FeatureContainer>
        <LoginCard configuration={configuration} />
      </FeatureContainer>
    </Flex>
  )
}

export { AccountSecurityView }
