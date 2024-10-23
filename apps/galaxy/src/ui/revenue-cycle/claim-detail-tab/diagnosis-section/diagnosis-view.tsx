'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ICD10Code } from '@/types'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchDiagnosisInput } from './search-diagnosis-input'

const DiagnosisView = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  const claimDiagnosis = form.watch('claimDiagnosis')

  const handleSelectedItem = (selectedItem: ICD10Code) => {
    const newDiagnosis = {
      diagnosisCode: selectedItem.code,
      diagnosisDescription: selectedItem.description,
    }
    form.setValue('claimDiagnosis', [...claimDiagnosis, newDiagnosis])
  }

  const removeDiagnosis = (diagnosisCode: string | undefined) => {
    const updatedDiagnosis = claimDiagnosis.filter(
      (item) => item.diagnosisCode !== diagnosisCode,
    )
    form.setValue('claimDiagnosis', updatedDiagnosis)
  }

  return (
    <>
      <Flex align="center" gap="2">
        <SearchDiagnosisInput
          placeholder="ICD-10 Codes"
          onSelectItem={handleSelectedItem}
        />
      </Flex>
      <Flex align="center" justify="start" gap="2" mt="2">
        {claimDiagnosis.map((icdItem) => {
          return (
            <Box
              className="border-pp-icd-border bg-pp-icd-bg rounded-[20px] border-2 px-2"
              key={icdItem.diagnosisCode}
            >
              <Flex align="center" justify="center" gap="2">
                <Text>{icdItem.diagnosisCode}</Text>
                <Cross1Icon
                  onClick={() => removeDiagnosis(icdItem.diagnosisCode)}
                />
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </>
  )
}

export { DiagnosisView }
