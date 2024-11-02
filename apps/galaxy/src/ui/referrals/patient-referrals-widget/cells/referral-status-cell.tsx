'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '../../actions'
import { StatusSelect } from '../status-select'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ReferralStatusCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const options = useCodesetOptions(CODESETS.ResourceStatus)
  const [selectedValue, setSelectedValue] = useState(
    referral?.resourceStatus ?? '',
  )
  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      resourceStatus: value,
  })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(referral?.resourceStatus ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }
  return (
    <StatusSelect
      value={selectedValue}
      onValueChange={updateContactMadeStatus}
      options={options}
      disabled={disabled}
    />
  )
}

export { ReferralStatusCell }
