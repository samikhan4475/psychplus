'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const CliaField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">CLIA</FormFieldLabel>
      <TextInput field="clia" className="h-6 w-full" />
    </FormFieldContainer>
  )
}

export { CliaField }
