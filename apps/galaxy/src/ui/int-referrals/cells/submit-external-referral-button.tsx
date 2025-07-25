'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { PatientReferral } from '@/types'
import { submitExternalReferralAction } from '@/ui/referrals/patient-referrals-widget/actions'
import { referralServiceType, VisitTypes } from '../types'

interface BookButtonProps {
  referral: PatientReferral
}
const SubmitExternalReferralButton = ({ referral }: BookButtonProps) => {
  const [loading, setLoading] = useState(false)
  const onBook = async () => {
    setLoading(true)
    const payload = {
      ...referral,
      referralId: referral.id,
      additionalNotes: referral.comments ? referral.comments : 'Send to NOCD',
      patientStateCode: referral.stateCode,
      practiceStateCode: referral.stateCode,
      referralServiceType: referralServiceType.OCD,
      patientContactDetails: referral.contactDetails,
      referrerShortName: referralServiceType.ReferrerShortName,
    }

    const response = await submitExternalReferralAction({
      payload,
    })

    if (response.state === 'error') {
      toast.error(response.error)
    }

    if (response.state === 'success') {
      toast.success('Submitted successfully!')
    }
    setLoading(false)
  }

  return (
    <Button
      size="1"
      type="button"
      highContrast
      onClick={onBook}
      disabled={
        referral.visitTypeCode !== VisitTypes.ExposureResponseTherapy ||
        !!referral.sentToNocdDate
      }
      loading={loading}
    >
      Send to NOCD
    </Button>
  )
}

export { SubmitExternalReferralButton }
