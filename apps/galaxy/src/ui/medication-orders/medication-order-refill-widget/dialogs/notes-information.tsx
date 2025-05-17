'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

interface NotesInformationProps {
  index: number
}
const NotesInformation = ({ index }: NotesInformationProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Instruction & Notes</FormFieldLabel>
      <TextInput
        field={`drugList.${index}.notes`}
        placeHolder="Add notes"
        className="mt-1 h-6 w-full "
      />
    </FormFieldContainer>
  )
}

export { NotesInformation }
