'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '../../actions'
import { DISABLE_CODESET_ATTRIBUTE } from '../constants'
import { StatusSelect } from '../status-select'
import { isContactMadeScheduledOrCancelled, isReferralDeleted } from '../utils'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ContactMadeSelectCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(referral?.contactStatus)
  const options = useCodesetOptions(
    CODESETS.ContactMadeStatus,
    DISABLE_CODESET_ATTRIBUTE,
  )

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
      options={options}
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
