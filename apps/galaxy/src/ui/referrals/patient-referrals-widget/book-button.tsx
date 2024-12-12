'use client'

import { Button } from '@radix-ui/themes'
import { PatientReferral } from '@/types'
import { isContactStatusError } from './utils'

interface BookButtonProps {
  referral: PatientReferral
}
const BookButton = ({ referral }: BookButtonProps) => {
  return (
    <Button
      size="1"
      type="button"
      highContrast
      disabled={isContactStatusError(referral.contactStatus)}
    >
      Book
    </Button>
  )
}

export { BookButton }
