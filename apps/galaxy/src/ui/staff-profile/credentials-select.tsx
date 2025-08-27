import React from 'react'
import { FormFieldContainer, FormFieldError, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from './schema'
import { StaffType } from '../staff-management/types'

const CredentialsSelect = () => {
  const form = useFormContext<SchemaType>()
  const staffTypeLabel = form.watch('staffTypeLabel')
  const specialtyCodes = form.watch('specialtyCodes')
  const honorCodes = useCodesetCodes(CODESETS.PractitionerHonor)

  const options = honorCodes
    .filter(({ attributes = [] }) =>
      attributes.some(attr => {
        const [systemName = '', code = ''] = attr.value.split('|')
        const specialtyCode = specialtyCodes || ''
        return systemName.includes(specialtyCode) ||
          code.includes(specialtyCode)
      })
    )
    .map(({ display, value }) => ({ label: display, value }))

  return (
    <FormFieldContainer>
      <FormFieldLabel required={staffTypeLabel === StaffType.Provider}>Credentials</FormFieldLabel>
      <SelectInput
        field="legalName.title"
        options={options.length ? options : []}        
        disabled={!options.length}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="legalName.title" />
    </FormFieldContainer>
  )
}
export { CredentialsSelect }
