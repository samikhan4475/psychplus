'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getProvidersOptionsAction } from '@/actions'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getOptionLabel } from '@/utils'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'

const PrescriberField = ({ index }: DrugBlockProps) => {
  const { setValue } = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'prescribingStaffId')
  const nameField = getFieldName(index, 'prescribingStaffName')
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const handleValueChange = (value: string) => {
    const selectedOption = getOptionLabel(options, value)
    if (selectedOption) {
      setValue(field, value)
      setValue(nameField, selectedOption)
    }
  }
  useEffect(() => {
    setLoading(true)
    getProvidersOptionsAction()
      .then((res) => {
        if (res?.state === 'error') {
          return toast.error(res?.error)
        }
        setOptions(res?.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Prescriber</FormFieldLabel>
      <SelectInput
        field={field}
        placeholder="Select"
        options={options}
        loading={loading}
        onValueChange={handleValueChange}
        buttonClassName="w-full h-7"
        className="w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { PrescriberField }
