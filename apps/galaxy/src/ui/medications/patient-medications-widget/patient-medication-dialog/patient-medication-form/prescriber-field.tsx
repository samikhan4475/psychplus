'use client'

import { useEffect, useMemo } from 'react'
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
import { useStore as useGlobalStore } from '@/store'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'

const PrescriberField = ({ index }: DrugBlockProps) => {
  const { setValue, getValues } = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'prescribingStaffId')
  const nameField = getFieldName(index, 'prescribingStaffName')
  const { providerOptions, loadingProviderOptions } = useStore((state) => ({
    providerOptions: state.providerOptions,
    loadingProviderOptions: state.loadingProviderOptions,
  }))
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))

  const providerName = useMemo(() => {
    return getOptionLabel(providerOptions, String(staffId))
  }, [providerOptions, staffId])

  useEffect(() => {
    const currentPrescriber = getValues(field)
    if (
      staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER &&
      !currentPrescriber &&
      staffId
    ) {
      setValue(field, String(staffId))
      if (providerName) {
        setValue(nameField, providerName)
      }
    }
  }, [field, nameField, staffId, staffRoleCode, setValue, getValues, providerName])

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
