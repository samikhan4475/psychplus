'use client'

import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { useStore } from '../store'

const ProviderCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { providersList } = zustandUseStore(store, (state) => ({
    providersList: state.providersList,
  }))

  return (
    <StatusSelect
      value={
        referral?.metadata?.createdBy ? `${referral?.metadata?.createdBy}` : ''
      }
      options={providersList}
      disabled
    />
  )
}

export { ProviderCell }
