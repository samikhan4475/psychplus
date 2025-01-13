import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS, HOSPITAL_SERVICE_GROUP } from '@/constants'

const DcHospitalServiceType = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>DC Hospital Service Type</FormFieldLabel>
      <CodesetSelect
        name="dcHospitalServiceType"
        codeset={CODESETS.PlaceOfSerivce}
        groupingCodes={HOSPITAL_SERVICE_GROUP}
        size="1"
        className="w-auto"
      />
    </FormFieldContainer>
  )
}

export { DcHospitalServiceType }
