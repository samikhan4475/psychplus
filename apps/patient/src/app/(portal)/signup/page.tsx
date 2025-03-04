import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets } from '@/api'
import { SignupView } from '@/features/signup'

const SignupPage = async () => {
  const codesetsResp = await getCodesets([CODESETS.Gender])

  return <SignupView genderCodes={codesetsResp.Gender.codes} />
}

export default SignupPage
