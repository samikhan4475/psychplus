'use client'

import { Flex } from '@radix-ui/themes'
import { AddPatientDialog } from '../add-patient-dialog'
import { CreditCardButton } from './credit-card-button'
import { InsuranceVerificationButton } from './insurance-verification-button'
import { NoFollowUpButton } from './no-follow-up-button'
import { PatientVerificationButton } from './patient-verification-button'
import { PolicyConsentsButton } from './policy-consents-button'
import { RecentNewButton } from './recent-new-button'

interface SmartFiltersProps {
  googleApiKey: string
}
const SmartFilters = ({ googleApiKey }: SmartFiltersProps) => {
  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <RecentNewButton />
      <NoFollowUpButton />
      <CreditCardButton />
      <PolicyConsentsButton />
      <InsuranceVerificationButton />
      <PatientVerificationButton />
      <AddPatientDialog googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { SmartFilters }
