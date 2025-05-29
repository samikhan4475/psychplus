'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const InstructionsOrNotesField = ({ index }: DrugBlockProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Instruction & Notes</FormFieldLabel>
      <TextInput
        field={getFieldName(index, 'instructionOrNotes')}
        placeHolder="Add notes"
        className="mt-1 h-6 w-full resize-y"
        maxLength={210}
      />
    </FormFieldContainer>
  )
}

export { InstructionsOrNotesField }
