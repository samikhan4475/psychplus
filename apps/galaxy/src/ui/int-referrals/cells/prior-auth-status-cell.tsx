'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { useStore } from '../store'

const PriorAuthStatusCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.priorAuthorizationStatus ?? '',
  )

  const updateReferralPriorAuthStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      priorAuthorizationStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.priorAuthorizationStatus ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          priorAuthorizationStatus: value,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    toast.success('Successfully updated!')
  }

  return (
    <CodesetSelectCell
      value={selectedValue}
      onValueChange={updateReferralPriorAuthStatus}
      codeset="PriorAuthorizationStatus"
    />
  )
}

export { PriorAuthStatusCell }
