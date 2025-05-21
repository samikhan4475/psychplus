'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'
import { UpdateMedicationSchema } from './schema'

interface NotesInformationProps {
  index: number
}
const NotesInformation = ({ index }: NotesInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const drugDiagnosisList =
    useWatch({
      control: form.control,
      name: `drugList.${index}.drugDiagnosisList`,
      defaultValue: [],
    }) ?? []
  const notesField = `drugList.${index}.notes` as const
  return (
    <>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Instruction & Notes</FormFieldLabel>
        <TextInput
          field={notesField}
          placeHolder="Add notes"
          className="mt-1 h-6 w-full "
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Diagnoses</FormFieldLabel>
        {drugDiagnosisList.map((item) => {
          return (
            <TextField.Root
              key={item.id}
              value={`${item.diagnosisCode} - ${item.diagnosisDescription}`}
              className="h-6  w-full"
              size="1"
              disabled
            />
          )
        })}
      </FormFieldContainer>
    </>
  )
}

export { NotesInformation }
