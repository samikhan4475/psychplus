import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PatientReferral } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { sendEvent } from '@/utils'
import { signPatientReferralAction } from '../actions/sign-patient-referral'
import { isReferralSignAble } from './utils'

interface DeleteReferralButtonProps {
  referral: PatientReferral
  onClose?: () => void
}
const SignReferralButton = ({
  referral,
  onClose,
}: DeleteReferralButtonProps) => {
  const { isQuickNoteView } = useQuickNoteUpdate()
  const [loading, setLoading] = useState(false)

  const handleSignReferral = async () => {
    setLoading(true)
    const result = await signPatientReferralAction({
      patientId: referral.patientId,
      referralId: referral.id,
    })
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to update!')
    } else {
      toast.success('Successfully signed!')

      if (isQuickNoteView) {
        sendEvent({
          widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
          eventType: 'widget:save',
        })
      }
    }
    onClose?.()
    setLoading(false)
  }

  return (
    <Button
      size="1"
      disabled={loading || isReferralSignAble(referral.resourceStatus)}
      onClick={handleSignReferral}
      highContrast
    >
      Sign
    </Button>
  )
}

export { SignReferralButton }
