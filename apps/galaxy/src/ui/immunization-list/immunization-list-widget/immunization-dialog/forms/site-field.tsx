'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'


const SiteField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Site</FormFieldLabel>
      <CodesetSelect
        className="h-6"
        name="siteCode"
        codeset={CODESETS.ImmunizationAdministiveSite}
        size="1"
      />
      <FormFieldError name="siteCode" />
    </FormFieldContainer>
  )
}

export { SiteField } 