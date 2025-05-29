'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const SubstitutionField = ({ index }: DrugBlockProps) => {
    const { setValue, watch } = useFormContext()
    const field = getFieldName(index, 'isSubstitutionsAllowed')
    const fieldValue = watch(field,options[0].value) 

    return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Substitution</FormFieldLabel>
      <SelectInput
        options={options}
        field={field}
        buttonClassName="w-full h-6"
        defaultValue={fieldValue}
        onValueChange={value => {
          setValue(field,value)
        }}
      />
    </FormFieldContainer>
  )
}
const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { SubstitutionField }
