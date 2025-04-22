'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const PPPayerStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.UsStates)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">PP Payer Status</FormFieldLabel>
      <DropdownSelect
        field="stateCode"
        options={options}
        buttonClassName="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PPPayerStatusSelect }
