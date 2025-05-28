import { Flex } from '@radix-ui/themes'
import { AuthorizationNumber } from './authorization-number'
import { ClaimFrequencySelect } from './claim-frequency-select'
import { ClaimNotes } from './claim-notes'
import { CliaNumber } from './clia-number'
import { ReferralNumber } from './referral-number'

const AuthAndReferralsView = () => {
  return (
    <>
      <Flex gap="3">
        <AuthorizationNumber />
        <ReferralNumber />
        <ClaimFrequencySelect />
        <CliaNumber />
      </Flex>
      <ClaimNotes />
    </>
  )
}

export { AuthAndReferralsView }
