'use client'

import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'
import { FieldLabel } from '../../shared'
import { useCodesetOptions } from '@/hooks'

const GenderSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Gender</FieldLabel>
      <DropdownSelect field='gender' options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { GenderSelect }
