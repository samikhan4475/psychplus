import { Flex } from '@radix-ui/themes'
import { AuthorizationNumber } from './authorization-number'
import { ClaimNotes } from './claim-notes'
import { CliaNumber } from './clia-number'
import { ReferralNumber } from './referral-number'

const AuthAndReferralsView = () => {
  return (
    <>
      <Flex gap="3">
        <AuthorizationNumber />
        <ReferralNumber />
        <CliaNumber />
      </Flex>
      <ClaimNotes />
    </>
  )
}

export { AuthAndReferralsView }
