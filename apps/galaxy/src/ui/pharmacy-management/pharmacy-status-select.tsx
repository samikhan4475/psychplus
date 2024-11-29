'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const PharmacyStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.ResourceStatus)

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="status"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={options}
        tooltip
        disabled
      />
    </FormFieldContainer>
  )
}

export { PharmacyStatusSelect }
