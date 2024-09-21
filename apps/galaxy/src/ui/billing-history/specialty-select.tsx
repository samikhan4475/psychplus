'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const SpecialtySelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Specialty</FormFieldLabel>
      <CodesetSelect
        name="specialty"
        codeset={CODESETS.SpecialistType}
        className={'w-[122px]'}
        size="1"
      />
    </FormFieldContainer>
  )
}
export { SpecialtySelect }
