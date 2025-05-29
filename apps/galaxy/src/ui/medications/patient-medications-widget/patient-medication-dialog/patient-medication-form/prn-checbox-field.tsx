'use client'

import { useFormContext } from 'react-hook-form'
import { CheckboxCell, FormFieldContainer, FormFieldLabel } from '@/components'
import { DrugBlockProps,MedicationType } from '../../types'
import { getFieldName } from '../../utils'

const PRNField = ({ index }: DrugBlockProps) => {
  const { setValue, watch } = useFormContext()
  const field = getFieldName(index, 'isMedicationAsNeeded')
  const reasonForPrn = getFieldName(index, 'reasonForPrn')
  const prnChecked = watch(field) ?? (MedicationType.Home ? true : false);

  return (
    <FormFieldContainer className="flex-row">
      <CheckboxCell
        checked={prnChecked}
        onCheckedChange={(checked) => {
          setValue(field, checked)
          if (!checked) {
            setValue(reasonForPrn, '')
          }
        }}
      />
      <FormFieldLabel required>PRN</FormFieldLabel>
    </FormFieldContainer>
  )
}

export { PRNField }
