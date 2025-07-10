import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets, getConfiguration } from '@/api'
import { SignupView } from '@/features/signup'
import { Text } from '@radix-ui/themes'

const SignupPage = async () => {
  const [codesetsResp, configurationResponse] = await Promise.all([
    getCodesets([CODESETS.Gender]),
    getConfiguration(),
  ])

  if (configurationResponse.state === 'error') {
    return <Text>Error: {configurationResponse.error}</Text>
  }

  return (
    <SignupView
      genderCodes={codesetsResp.Gender.codes}
      configuration={configurationResponse.data}
    />
  )
}

export default SignupPage
