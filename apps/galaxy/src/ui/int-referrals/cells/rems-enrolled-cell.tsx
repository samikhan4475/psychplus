'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}

const options = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  },
]

const RemsEnrolledCell = ({ row: { original: referral } }: Props) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.isRemsEnrolled ? 'Yes' : 'No',
  )

  const updateREMSStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      isRemsEnrolled: value === 'Yes',
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.isRemsEnrolled ? 'Yes' : 'No')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          isRemsEnrolled: value === 'Yes',
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
      onValueChange={updateREMSStatus}
      options={options}
    />
  )
}

export { RemsEnrolledCell }
