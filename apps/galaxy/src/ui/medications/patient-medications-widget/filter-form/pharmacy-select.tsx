'use client'

import { useCallback } from 'react'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { searchPharmaciesAction } from '../actions'

interface PharmacySelectProps {
  patientId: string
}
const PharmacySelect = ({ patientId }: PharmacySelectProps) => {
  const fetchPharmacies = useCallback(() => {
    return searchPharmaciesAction(patientId)
  }, [patientId])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Pharmacy</FormFieldLabel>
      <AsyncSelect
        field="pharmacyNcpdpId"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        fetchOptions={fetchPharmacies}
      />
    </FormFieldContainer>
  )
}

export { PharmacySelect }
