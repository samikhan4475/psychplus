'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const MedicationSelect = () => {
  const options = useCodesetOptions(CODESETS.MedicationStatus)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Medication Status</FormFieldLabel>
      <SelectInput
        field="medicationStatuses"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        options={options}
      />
    </FormFieldContainer>
  )
}

export { MedicationSelect }
