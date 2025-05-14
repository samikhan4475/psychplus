'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'

const ContactInitiatedSelect = () => {
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  //TODO: will be integration once the API is ready in Phase 2
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">
        Contact Initiated Status
      </FormFieldLabel>
      <DropdownSelect
        field="contactMadeStatusList"
        options={sortCodesetBySortAttribute(codes)}
      />
    </FormFieldContainer>
  )
}

export { ContactInitiatedSelect }
