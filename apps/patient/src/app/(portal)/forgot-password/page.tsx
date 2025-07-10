import { Flex, Text } from '@radix-ui/themes'
import { getConfiguration } from '@/api'
import { AnonHeader } from '@/components-v2'
import ForgotPasswordView from './forgot-password-view'

const ForgotPasswordPage = async () => {
  const configuration = await getConfiguration()

  if (configuration.state === 'error') {
    return <Text>Error: {configuration.error}</Text>
  }

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
        <ForgotPasswordView configuration={configuration.data} />
      </Flex>
    </Flex>
  )
}

export default ForgotPasswordPage
