'use client'

import { useMemo } from 'react'
import { PatientProfile } from '@psychplus-v2/types'
import { getSlashedDateString } from '@psychplus-v2/utils'
import { Badge, Flex, Text } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { FeatureCard } from '@/components-v2'
import { CreditCard } from '../../payments/types'
import { Membership } from '../types'
import { ActivateMembership } from './activate-membership'
import { CancelMembership } from './cancel-membership'
import { MembershipBenefitsDialog } from './membership-benefit-dialog'

interface MembershipCardProps {
  creditCards: CreditCard[]
  membership: Membership
  stripeApiKey: string
  user: PatientProfile
}

const MembershipCard = ({
  membership,
  creditCards,
  stripeApiKey,
  user,
}: MembershipCardProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])
  return (
    <Elements stripe={stripePromise}>
      <FeatureCard title="Membership" contentClassName="gap-3">
        {membership.isMember ? (
          <Flex align="center" justify="between">
            <Flex direction="column">
              <Text>
                Membership status:
                <Badge color="green" className="ml-1">
                  Active
                </Badge>
              </Text>
              <Text size="2" className="text-gray-11">
                Next billing date:{' '}
                {getSlashedDateString(membership.recurringChargeDate)}
              </Text>
            </Flex>
            <CancelMembership />
          </Flex>
        ) : (
          <Flex align="center" justify="between">
            <Flex direction="column">
              <Text>
                Membership status:
                <Badge color="gray" className="ml-1">
                  Inactive
                </Badge>
              </Text>
              <MembershipBenefitsDialog />
            </Flex>
            <ActivateMembership user={user} creditCards={creditCards} />
          </Flex>
        )}
      </FeatureCard>
    </Elements>
  )
}

export { MembershipCard }
