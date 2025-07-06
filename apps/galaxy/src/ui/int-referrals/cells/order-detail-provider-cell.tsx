'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const OrderDetailProviderCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData, providersList } = zustandUseStore(store, (state) => ({
    providersList: state.providersList,
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.referralProviderStaffId
      ? `${referral?.referralProviderStaffId}`
      : '',
  )

  const updateOrderDetailProviderStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      referralProviderStaffId: Number(value),
    })
    if (result.state === 'error') {
      setSelectedValue(
        referral?.referralProviderStaffId
          ? `${referral?.referralProviderStaffId}`
          : '',
      )
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          referralProviderStaffId: Number(value),
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
      onValueChange={updateOrderDetailProviderStatus}
      options={providersList}
    />
  )
}

export { OrderDetailProviderCell }
