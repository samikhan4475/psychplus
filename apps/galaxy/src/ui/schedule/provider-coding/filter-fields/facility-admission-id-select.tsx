'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'
import { getFacilityAdmissionIdsOptions } from '../actions/get-facility-admission-ids-options'

const FacilityAdmissionIdSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.FacilityAdmissionId)) return null

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Facility Admission ID</FormFieldLabel>
      <AsyncSelect
        field="facilityAdmissionIds"
        placeholder="Select"
        fetchOptions={getFacilityAdmissionIdsOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionIdSelect }
