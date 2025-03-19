'use client'

import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const GenderSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Gender</FieldLabel>
      <DropdownSelect field="gender" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { GenderSelect }
