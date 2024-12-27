'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LicenseManagerSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="ml-6 !text-1">Search & Select</FormFieldLabel>
      <CodesetSelect
        name="licenseManager"
        codeset={CODESETS.ClaimFiltrationDateType}
        size="1"
        className="w-[183px]"
      />
    </FormFieldContainer>
  )
}

export { LicenseManagerSelect }
