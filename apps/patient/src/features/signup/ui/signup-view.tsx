import { ConfigurationResponse, SharedCode } from '@psychplus-v2/types'
import { Flex } from '@radix-ui/themes'
import { AnonHeader } from '@/components-v2'
import { SignupForm } from './signup-from'

const SignupView = ({
  genderCodes,
  configuration,
}: {
  genderCodes: SharedCode[]
  configuration: ConfigurationResponse
}) => {
  return (
    <Flex direction="column" width="100%">
      <AnonHeader />
      <Flex
        direction="column"
        height="100%"
        align="center"
        justify="center"
        gap="4"
        px="5"
        className="flex-1 py-20"
      >
        <SignupForm 
          genderCodes={genderCodes} 
          configuration={configuration}
        />
      </Flex>
    </Flex>
  )
}

export { SignupView }
