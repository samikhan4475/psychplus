'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const OrderDetailLocationCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData, locationsList } = zustandUseStore(store, (state) => ({
    locationsList: state.locationsList,
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.referralProviderLocationId,
  )

  const updateReferralStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      referralProviderLocationId: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.referralProviderLocationId)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          referralProviderLocationId: value,
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
      onValueChange={updateReferralStatus}
      options={locationsList}
    />
  )
}

export { OrderDetailLocationCell }
