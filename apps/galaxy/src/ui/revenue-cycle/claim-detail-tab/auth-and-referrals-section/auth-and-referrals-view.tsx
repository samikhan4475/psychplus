import { Flex } from '@radix-ui/themes'
import { AuthorizationNumber } from './authorization-number'
import { ClaimNotes } from './claim-notes'
import { ReferralNumber } from './referral-number'

const AuthAndReferralsView = () => {
  return (
    <>
      <Flex gap="3">
        <AuthorizationNumber />
        <ReferralNumber />
      </Flex>
      <ClaimNotes />
    </>
  )
}

export { AuthAndReferralsView }
