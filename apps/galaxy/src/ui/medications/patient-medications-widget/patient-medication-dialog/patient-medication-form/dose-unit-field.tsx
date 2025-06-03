'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { DrugBlockProps } from '../../types'
import {
  getDrugUnitOptions,
  getFieldName,
  getSurescriptsCode,
} from '../../utils'
import { PatientMedicationSchemaType } from './schema'

const DoseUnitField = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'doseUnitCode')
  const quantityMeasureCode = getFieldName(index, 'quantityUnitOfMeasureCode')

  const codes = useCodesetCodes(CODESETS.PrescriptionQuantityUnitOfMeasureList)

  const handleValueChange = (value: string) => {
    const surescriptsCode = getSurescriptsCode(codes, value)
    form.setValue(quantityMeasureCode, surescriptsCode)
    form.setValue(field, value, { shouldValidate: true })
  }

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Quantity Unit</FormFieldLabel>
      <SelectInput
        field={field}
        options={getDrugUnitOptions(codes)}
        onValueChange={handleValueChange}
        className=""
        buttonClassName="h-6 w-[155px]"
        size="1"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DoseUnitField }
