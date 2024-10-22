'use client'

import { Flex } from '@radix-ui/themes'
import { AddPatientButton } from './add-patient-button'
import { CreditCardButton } from './credit-card-button'
import { InsuranceVerificationButton } from './insurance-verification-button'
import { NoFollowUpButton } from './no-follow-up-button'
import { PatientVerificationButton } from './patient-verification-button'
import { PolicyConsentsButton } from './policy-consents-button'
import { RecentNewButton } from './recent-new-button'

const SmartFilters = () => {
  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <RecentNewButton />
      <NoFollowUpButton />
      <CreditCardButton />
      <PolicyConsentsButton />
      <InsuranceVerificationButton />
      <PatientVerificationButton />
      <AddPatientButton />
    </Flex>
  )
}

export { SmartFilters }
