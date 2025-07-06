'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral, SelectOptionType } from '@/types'
import { getVisitTypesAction } from '@/ui/location/service/actions'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const VisitTypeCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState(
    referral?.visitTypeId ? `${referral?.visitTypeId}` : '',
  )
  const [visitTypes, setVisitTypes] = useState<SelectOptionType[]>([])

  useEffect(() => {
    if (referral.service && selectedValue) {
      setLoading(true)
      setVisitTypes([])
      getVisitTypesAction(referral.service).then((res) => {
        if (res.state === 'error') {
          setVisitTypes([])
          return toast.error(res.error || 'Failed to fetch visit types')
        }

        const visitTypesList: SelectOptionType[] = res.data.map((item) => ({
          label: item.encounterName,
          value: `${item.id}`,
        }))
        setVisitTypes(visitTypesList)
        setLoading(false)
      })
    }
  }, [referral.service])

  const updateReferralVisitType = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      visitTypeId: value,
    })
    if (result.state === 'error') {
      setSelectedValue(`${referral?.visitTypeId}`)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          visitTypeId: value,
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
      onValueChange={updateReferralVisitType}
      options={visitTypes}
      disabled={loading}
    />
  )
}

export { VisitTypeCell }
