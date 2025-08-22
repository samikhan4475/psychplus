'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { useHasPermission } from '@/hooks'
import { PatientReferral } from '@/types'
import { submitExternalReferralAction } from '@/ui/referrals/patient-referrals-widget/actions'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getDateLabel } from '@/utils'
import { useStore } from '../store'
import { referralServiceType, VisitTypes } from '../types'

interface BookButtonProps {
  referral: PatientReferral
}
const SubmitExternalReferralButton = ({ referral }: BookButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasPermission = useHasPermission('initiateNocdReferralSubmit')
  const store = useStore()
  const { page, fetchPatientReferrals, formValues } = zustandUseStore(
    store,
    (state) => ({
      page: state.page,
      fetchPatientReferrals: state.fetchPatientReferrals,
      formValues: state.formValues,
    }),
  )
  const [loading, setLoading] = useState(false)
  const onBook = async () => {
    if (!hasPermission) {
      setIsOpen(true)
      return
    }
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
      patientDob:
        referral.patientDateOfBirth &&
        getDateLabel(new Date(referral.patientDateOfBirth)),
    }
    const response = await submitExternalReferralAction({
      payload,
    })

    if (response.state === 'error') {
      toast.error(response.error)
    }

    if (response.state === 'success') {
      toast.success('Submitted successfully!')
      fetchPatientReferrals(formValues, page)
    }
    setLoading(false)
  }

  return (
    <>
      <PermissionAlert
        message="You do not have permission to submit referral to NOCD. Please contact your supervisor if you need any further assistance"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button
        size="1"
        type="button"
        highContrast
        onClick={onBook}
        disabled={
          referral.visitTypeCode !== VisitTypes.ExposureResponseTherapy ||
          !!referral.sentToThirdPartyDate
        }
        loading={loading}
      >
        Send to NOCD
      </Button>
    </>
  )
}

export { SubmitExternalReferralButton }
