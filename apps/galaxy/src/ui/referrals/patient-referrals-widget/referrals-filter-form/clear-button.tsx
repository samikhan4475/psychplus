'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { useStore } from '../store'
import { PatientReferralsSchemaType } from './schema'

const ClearButton = () => {
  const form = useFormContext<PatientReferralsSchemaType>()
  const store = useStore()
  const { fetchPatientReferrals } = zustandUseStore(store, (state) => ({
    fetchPatientReferrals: state.fetchPatientReferrals,
  }))

  const handleResetForm = () => {
    fetchPatientReferrals({}, 1, true)
    form.reset({
      contactStatusList: [],
      resourceStatusList: [],
      servicesOfferedList: [],
      fromReferralDate: null,
      toReferralDate: null,
      nextVisit: '',
      initiatedByRole: [],
      providerNames: [],
      serviceStatuses: [],
      visitHx: '',
    })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-8"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
