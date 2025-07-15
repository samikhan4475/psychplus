'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getOptionLabel } from '@/utils'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'
import { useStore } from '../../store'
const PrescriberField = ({ index }: DrugBlockProps) => {
  const { setValue } = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'prescribingStaffId')
  const nameField = getFieldName(index, 'prescribingStaffName')
  const { providerOptions, loadingProviderOptions } = useStore((state) => ({
    providerOptions: state.providerOptions,
    loadingProviderOptions: state.loadingProviderOptions,
  }))

  const handleValueChange = (value: string) => {
    const selectedOption = getOptionLabel(providerOptions, value)
    if (selectedOption) {
      setValue(field, value)
      setValue(nameField, selectedOption)
    }
  }

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Prescriber</FormFieldLabel>
      <SelectInput
        field={field}
        placeholder="Select"
        options={providerOptions}
        loading={loadingProviderOptions}
        onValueChange={handleValueChange}
        buttonClassName="w-full h-7"
        className="w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { PrescriberField }
