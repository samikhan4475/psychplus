'use client'

import { Button } from '@radix-ui/themes'
import { PatientReferral } from '@/types'
import { AddVisit } from '@/ui/visit/add-visit'
import { transformOutPatientRow } from './transform'
import { isReferralDeleted } from './utils'

interface BookButtonProps {
  referral: PatientReferral
}
const BookButton = ({ referral }: BookButtonProps) => {
  return (
    <AddVisit showAddUser={false} patient={transformOutPatientRow(referral)}>
      <Button
        size="1"
        type="button"
        highContrast
        onClick={(e) => e.stopPropagation()}
        disabled={isReferralDeleted(referral?.resourceStatus)}
      >
        Book
      </Button>
    </AddVisit>
  )
}

export { BookButton }
