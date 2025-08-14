'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'


const VaccineField = () => {  
  return (
    <FormFieldContainer>
      <FormFieldLabel>Vaccine Funding Program Eligibility</FormFieldLabel>
      <CodesetSelect
        className="h-6"
        name="fundingClass"
        codeset={CODESETS.FinancialClass}
        size="1"
      />
      <FormFieldError name="fundingClass" />
    </FormFieldContainer>
  )
}

export { VaccineField } 