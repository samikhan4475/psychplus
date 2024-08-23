'use client'

import { WidgetContainer } from '@/components'
import { AddReferralButton } from './add-referral-button'
import { PatientReferralsTable } from './patient-referrals-table'
import { StoreProvider } from './store'

interface PatientReferralsWidgetProps {
  patientId: string
}

const PatientReferralsWidget = ({ patientId }: PatientReferralsWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <WidgetContainer
        title="Referral"
        headerRight={
          <>
            <AddReferralButton />
          </>
        }
      >
        <PatientReferralsTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientReferralsWidget }
