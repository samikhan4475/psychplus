'use client'

import {
  Box,
  Flex,
  ScrollArea,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { useStore } from '../store'
import { PharmacyRxChangeRequest } from '../types'
import { AuthorizationInformation } from './authorization-information'
import { UpdateMedicationSchema } from './schema'
import { SearchDiagnosis } from './searchable-diagnosis'

interface NotesInformationProps {
  index: number
}
const NotesInformation = ({ index }: NotesInformationProps) => {
  const { activeTab } = useStore()
  const isRefillTab = activeTab.includes('Refill')

  const form = useFormContext<UpdateMedicationSchema>()
  const rxChangeRequestCode = form.getValues('rxChangeRequestCode')

  const drugDiagnosisList =
    form.getValues(`drugList.${index}.drugDiagnosisList`) ?? []
  const handleSelectedItem = (selectedItem: DiagnosisIcd10Code) => {
    const cleanedCode = selectedItem.code.endsWith('.')
      ? selectedItem.code.slice(0, -1)
      : selectedItem.code
    const updatedDiagnosis = {
      diagnosisCode: cleanedCode,
      diagnosisDescription: selectedItem.description || '',
    }

    form.setValue(`drugList.${index}.drugDiagnosisList`, [
      ...drugDiagnosisList,
      updatedDiagnosis,
    ])
  }
  const handleDelete = (codeToRemove: string) => {
    const updatedList = drugDiagnosisList.filter(
      (item) => item.diagnosisCode !== codeToRemove,
    )
    form.setValue(`drugList.${index}.drugDiagnosisList`, updatedList, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Pharmacy Instructions</FormFieldLabel>
        <TextArea
          placeholder="Notes here"
          className="mt-1 h-6 w-full "
          size="1"
          maxLength={300}
          disabled
          {...form.register(`drugList.${index}.drugNote`)}
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Instruction & Notes</FormFieldLabel>
        <TextArea
          placeholder="Notes here"
          className="mt-1 h-6 w-full "
          size="1"
          maxLength={300}
          {...form.register(`drugList.${index}.notes`)}
        />
      </FormFieldContainer>

      {rxChangeRequestCode ===
        PharmacyRxChangeRequest.PriorAuthorizationRequired || isRefillTab ? (
        <AuthorizationInformation index={index} />
      ) : null}
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Diagnosis</FormFieldLabel>
        <SearchDiagnosis
          onSelectItem={handleSelectedItem}
          selectedDianosis={drugDiagnosisList ?? []}
        />
        <ScrollArea className="max-h-[80px] py-0.5 pr-2">
          {drugDiagnosisList.map((item) => (
            <Flex
              key={item.id}
              display="flex"
              justify="between"
              align="center"
              className="border-pp-table-border border-b px-1.5 pb-0.5"
            >
              <Text className="w-full" size="1">
                {`${item.diagnosisCode} ${item.diagnosisDescription}`}
              </Text>
              <Box onClick={() => handleDelete(item.diagnosisCode)}>
                <Trash2
                  className="cursor-pointer"
                  color="black"
                  width={14}
                  height={14}
                />
              </Box>
            </Flex>
          ))}
        </ScrollArea>
      </FormFieldContainer>
    </>
  )
}

export { NotesInformation }
