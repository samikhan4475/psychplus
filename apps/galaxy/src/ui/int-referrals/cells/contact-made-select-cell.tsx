'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PatientReferral } from '@/types'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import {
  isContactMadeScheduledOrCancelled,
  isReferralDeleted,
} from '@/ui/referrals/patient-referrals-widget/utils'
import { AUTH_IO_PROCESS } from '../constants'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ContactMadeSelectCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(referral?.contactStatus)
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)

  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      contactStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.contactStatus ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    toast.success('Successfully updated!')
  }

  return (
    <StatusSelect
      options={sortCodesetBySortAttribute(codes, {
        includeDisabled: true,
      }).filter((option) => option.value !== AUTH_IO_PROCESS)}
      value={selectedValue}
      onValueChange={updateContactMadeStatus}
      disabled={
        disabled ||
        isReferralDeleted(referral?.resourceStatus) ||
        isContactMadeScheduledOrCancelled(referral?.contactStatus)
      }
    />
  )
}

export { ContactMadeSelectCell }
