'use client'

import { Flex, TextArea, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
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
  return (
    <>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Instruction & Notes</FormFieldLabel>
        <TextArea
          placeholder="Notes here"
          className="mt-1 h-6 w-full "
          size="1"
          maxLength={300}
          {...form.register(`drugList.${index}.drugNote`)}
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Diagnosis</FormFieldLabel>
        {drugDiagnosisList.length === 0 ? (
          <TextField.Root
            value=""
            placeholder="No diagnosis found"
            className="h-6 w-full"
            size="1"
            disabled
          />
        ) : (
          drugDiagnosisList.map((item) => (
            <TextField.Root
              key={item.id}
              value={`${item.diagnosisCode} - ${item.diagnosisDescription}`}
              className="h-6 w-full"
              size="1"
              disabled
            />
          ))
        )}
      </FormFieldContainer>
    </>
  )
}

export { NotesInformation }
