'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral, SelectOptionType } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const spravato = [
  'F33.2',
  'F32.0',
  'F32.1',
  'F32.2',
  'F32.9',
  'F33.0',
  'F33.1',
  'F33.9',
  'R45.851',
]

const tms = [
  'F33.2',
  'F32.0',
  'F32.1',
  'F32.2',
  'F32.9',
  'F33.0',
  'F33.1',
  'F33.9',
  'F42.2',
  'F17.210',
]

const DiagnosisCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral.diagnosisCode ?? '',
  )
  const [options, setOptions] = useState<SelectOptionType[]>([])

  useMemo(() => {
    if (referral.service === 'Tms') {
      setOptions(tms.map((item) => ({ value: item, label: item })))
    } else if (referral.service === 'Spravato') {
      setOptions(spravato.map((item) => ({ value: item, label: item })))
    }
  }, [referral])

  const updateReferralStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      diagnosisCode: value,
    })
    if (result.state === 'error') {
      setSelectedValue('')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          diagnosisCode: value,
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
      options={options}
    />
  )
}

export { DiagnosisCell }
