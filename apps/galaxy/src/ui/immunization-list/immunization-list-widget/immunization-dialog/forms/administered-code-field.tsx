'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const AdministeredCodeField = () => {

  return (
    <FormFieldContainer>
      <FormFieldLabel>Administered Status</FormFieldLabel>
      <CodesetSelect
        className="h-6 w-[155px]"
        name="administeredCode"
        codeset={CODESETS.ImmunizationAdministeredStatus}
        placeholder="Select Administered Status"
        size="1"
      />
      <FormFieldError name="administeredCode" />
    </FormFieldContainer>
  )
}

export { AdministeredCodeField }
