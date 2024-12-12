'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PracticeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="ml-2 !text-1">Practice</FormFieldLabel>
      <CodesetSelect
        name="practice"
        codeset={CODESETS.ClaimFiltrationDateType}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
