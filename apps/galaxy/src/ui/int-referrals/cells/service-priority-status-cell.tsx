'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const ServicePriorityStatusCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))

  const [selectedValue, setSelectedValue] = useState(
    referral?.servicesStatus ?? '',
  )
  const options = useCodesetOptions(CODESETS.ServicesStatus)

  const updateReferralServicePriorityStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      servicesStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.servicesStatus ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          servicesStatus: value,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    toast.success('Successfully updated!')
  }

  return (
    <StatusSelect
      value={selectedValue}
      onValueChange={updateReferralServicePriorityStatus}
      options={options}
    />
  )
}

export { ServicePriorityStatusCell }
