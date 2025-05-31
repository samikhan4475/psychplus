import { Flex, Text } from '@radix-ui/themes'
import { getScriptSureSessionToken } from '@/actions'
import { DAWSYS, SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'

const RxView = async () => {
  const response = await getScriptSureSessionToken(DAWSYS)

  if (response.state !== 'success') {
    return (
      <Flex display="flex" justify="center" align="center" height="100%">
        <Text>
          Your account has not been setup to use E-prescribe features.
        </Text>
      </Flex>
    )
  }
  const iframeSrc = `${SCRIPTSURE_BASE_APPLICATION_URL}/widgets/message?sessiontoken=${response.data}`
  return (
    <iframe
      src={iframeSrc}
      title="Add Allergies"
      className="h-[100vh] w-full"
    />
  )
}

export { RxView }
