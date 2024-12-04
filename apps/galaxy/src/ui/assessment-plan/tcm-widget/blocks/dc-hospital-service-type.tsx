import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS, HOSPITAL_SERVICE_GROUP } from '@/constants'

const DcHospitalServiceType = () => {
  return (
    <FormFieldContainer className="w-full flex-row">
      <FormFieldLabel>DC Hospital Service Type</FormFieldLabel>
      <CodesetSelect
        name="dcHospitalServiceType"
        codeset={CODESETS.PlaceOfSerivce}
        groupingCodes={HOSPITAL_SERVICE_GROUP}
        size="1"
        className="w-[150px]"
      />
    </FormFieldContainer>
  )
}

export { DcHospitalServiceType }
