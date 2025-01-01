'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ServiceStatusSelectCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(referral?.servicesStatus)

  const options = useCodesetOptions(CODESETS.ServicesStatus, '', [CODE_NOT_SET])
  const updateServiceStatusStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      contactStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(referral?.contactStatus ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }

  return (
    <StatusSelect
      options={options}
      value={selectedValue}
      onValueChange={updateServiceStatusStatus}
      disabled={disabled}
    />
  )
}

export { ServiceStatusSelectCell }
