'use client'

import { useFormContext } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { sortCodesetBySortAttribute } from '../patient-lookup/utils'
import { SchemaType } from './organization-users-list-filter-form'

const ContactInitiated = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Contact Initiated</FormFieldLabel>
      <DropdownSelect
        field="contactMadeStatuses"
        options={sortCodesetBySortAttribute(codes)}
        placeholder="Select"
        className="min-w-[72px] flex-1"
      />
      <MultiSelectField
        defaultValues={form.watch('contactMadeStatuses')}
        onChange={(values) => form.setValue('contactMadeStatuses', values)}
        placeholder="Select"
        className="h-6 min-w-[72px] flex-1"
        options={sortCodesetBySortAttribute(codes)}
      />
    </FormFieldContainer>
  )
}

export { ContactInitiated }
