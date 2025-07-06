'use client'

import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const LocationCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { locationsList } = zustandUseStore(store, (state) => ({
    locationsList: state.locationsList,
  }))

  return (
    <StatusSelect
      value={referral?.appointment?.locationId ?? ''}
      options={locationsList}
      disabled
    />
  )
}

export { LocationCell }
