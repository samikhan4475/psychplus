'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { sortCodesetBySortAttribute } from '../utils'

const ContactMadeSelect = () => {
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Contact Initiated</FormFieldLabel>
      <DropdownSelect
        field="contactMadeStatuses"
        options={sortCodesetBySortAttribute(codes)}
      />
    </FormFieldContainer>
  )
}

export { ContactMadeSelect }
