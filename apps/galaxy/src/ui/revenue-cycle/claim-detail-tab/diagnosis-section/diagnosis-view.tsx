'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ICD10Code } from '@/types'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchDiagnosisInput } from './search-diagnosis-input'

const DiagnosisView = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { getValues } = form
  const claimDiagnosis = form.watch('claimDiagnosis')

  const handleSelectedItem = (selectedItem: ICD10Code) => {
    const currentDiagnosisList = getValues('claimDiagnosis')
    // check if diag code exist dont add
    const isExist = currentDiagnosisList.some(
      (diagnosis) => diagnosis.diagnosisCode === selectedItem.code,
    )
    if (isExist) {
      return
    }

    const activeDiagnosis = currentDiagnosisList.filter(
      (diagnosis) => diagnosis.recordStatus !== 'Deleted',
    )

    const newDiagnosis = {
      claimId: getValues('id') ?? '',
      diagnosisCode: selectedItem.code,
      diagnosisDescription: selectedItem.description,
      deletedReason: '',
      sequenceNo: activeDiagnosis.length + 1,
      recordStatus: 'Active',
    }
    const updatedDiagnoses = [...currentDiagnosisList, newDiagnosis]
    form.setValue('claimDiagnosis', updatedDiagnoses)
  }

  const removeDiagnosis = (id?: string, diagnosisCode?: string) => {
    const currentDiagnosisList = getValues('claimDiagnosis')
    let updatedDiagnosis = [...currentDiagnosisList]

    if (id) {
      updatedDiagnosis = updatedDiagnosis.map((diagnosis) =>
        diagnosis.id === id
          ? { ...diagnosis, recordStatus: 'Deleted' }
          : diagnosis,
      )
    } else {
      updatedDiagnosis = currentDiagnosisList.filter(
        (diagnosis) => diagnosis.diagnosisCode !== diagnosisCode,
      )
    }

    // update seq num against active items
    const finalDiagnosisList = updatedDiagnosis.map((diagnosis, index) => {
      if (diagnosis.recordStatus !== 'Deleted') {
        return {
          ...diagnosis,
          sequenceNo: index + 1,
        }
      }
      return { ...diagnosis }
    })
    form.setValue('claimDiagnosis', finalDiagnosisList)
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
        {claimDiagnosis
          .filter((item) => item.recordStatus === 'Active')
          .map((icdItem) => {
            return (
              <Box
                className="border-pp-icd-border bg-pp-icd-bg rounded-[20px] border-2 px-2"
                key={icdItem.diagnosisCode}
              >
                <Flex align="center" justify="center" gap="2">
                  <Text>{icdItem.diagnosisCode}</Text>
                  <Cross1Icon
                    onClick={() =>
                      removeDiagnosis(icdItem.id, icdItem.diagnosisCode)
                    }
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
