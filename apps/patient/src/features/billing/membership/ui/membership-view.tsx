import { Flex } from '@radix-ui/themes'
import { getProfile } from '@/api'
import { FeatureContainer, FeatureHeading } from '@/components-v2'
import { getCreditCards, getStripeApiKey } from '../../credit-debit-cards/api'
import { getMembership } from '../api'
import { MembershipCard } from './membership-card'

const MembershipView = async () => {
  const [
    membershipResponse,
    creditCardResponse,
    stripeApiKeyResponse,
    profileResponse,
  ] = await Promise.all([
    getMembership(),
    getCreditCards(),
    getStripeApiKey(),
    getProfile(),
  ])

  if (membershipResponse.state === 'error') {
    throw new Error(membershipResponse.error)
  }

  if (creditCardResponse.state === 'error') {
    throw new Error(creditCardResponse.error)
  }

  if (stripeApiKeyResponse.state === 'error') {
    throw new Error(stripeApiKeyResponse.error)
  }

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }
  return (
    <Flex direction="column" gap="5" className='px-3 sm:px-0'>
      <FeatureContainer>
        <MembershipCard
          membership={membershipResponse.data}
          creditCards={creditCardResponse.data}
          stripeApiKey={stripeApiKeyResponse.data}
          user={profileResponse.data}
        />
      </FeatureContainer>
    </Flex>
  )
}

export { MembershipView }
