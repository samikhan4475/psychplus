'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { useStore } from '../store'
import { VisitTypes } from '../types'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}

const ProcurementCell = ({ row: { original: referral } }: Props) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(referral?.procurementType)

  const updateREMSStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      procurementType: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.procurementType ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          procurementType: value,
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
      onValueChange={updateREMSStatus}
      codeset="Procurement"
      disabled={referral.service !== VisitTypes.SPRAVATO}
    />
  )
}

export { ProcurementCell }
