'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const SubstitutionField = ({ index }: DrugBlockProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Substitution</FormFieldLabel>
      <SelectInput
        options={options}
        field={getFieldName(index, 'isSubstitutionsAllowed')}
        buttonClassName="w-full h-6"
      />
    </FormFieldContainer>
  )
}
const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { SubstitutionField }
