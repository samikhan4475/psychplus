'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { ICD10Code } from '../../types'
import { SchemaType } from './add-claim-form'
import { IcdSearchDropdown } from './icd-search-dropdown'

const Diagnosis = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const { setValue, getValues, watch } = form
  const claimDiagnoses = watch('claimDiagnosis') || []

  const handleSelectedItem = (selectedItem: ICD10Code) => {
    const currentDiagnoses = getValues('claimDiagnosis') || []
    const claimId = getValues('id')
    const exists = currentDiagnoses.some(
      (diagnosis) => diagnosis.diagnosisCode === selectedItem.code,
    )
    if (exists) {
      return
    }
    const newDiagnosis = {
      claimId: claimId ?? '',
      diagnosisCode: selectedItem.code,
      diagnosisDescription: selectedItem.description,
      deletedReason: '',
      sequenceNo: currentDiagnoses.length + 1,
      recordStatus: 'Active',
    }
    const updatedDiagnoses = [...currentDiagnoses, newDiagnosis]
    const claimServiceLines = form.getValues('claimServiceLines')
    claimServiceLines.map((charge) => {
      if (newDiagnosis.sequenceNo === 1) {
        charge.diagnosisPointer1 = newDiagnosis.sequenceNo.toString()
      }
      if (newDiagnosis.sequenceNo === 2) {
        charge.diagnosisPointer2 = newDiagnosis.sequenceNo.toString()
      }
      if (newDiagnosis.sequenceNo === 3) {
        charge.diagnosisPointer3 = newDiagnosis.sequenceNo.toString()
      }
      if (newDiagnosis.sequenceNo === 4) {
        charge.diagnosisPointer4 = newDiagnosis.sequenceNo.toString()
      }
      return charge
    })
    form.setValue(`claimServiceLines`, claimServiceLines)
    setValue('claimDiagnosis', updatedDiagnoses)
  }

  const handleRemoveDiagnosis = (
    id: string | undefined,
    diagnosisCode: string | undefined,
  ) => {
    const currentDiagnoses = getValues('claimDiagnosis') || []
    let updatedDiagnoses = [...currentDiagnoses]

    if (id) {
      updatedDiagnoses = updatedDiagnoses.map((diagnosis) =>
        diagnosis.id === id
          ? { ...diagnosis, recordStatus: 'Deleted' }
          : diagnosis,
      )
    } else if (diagnosisCode) {
      updatedDiagnoses = currentDiagnoses.filter(
        (diagnosis) => diagnosis.diagnosisCode !== diagnosisCode,
      )
    } else {
      updatedDiagnoses = currentDiagnoses
    }

    // Step 1: Calculate new sequence numbers for active diagnoses
    const activeDiagnoses = updatedDiagnoses
      .filter((diagnosis) => diagnosis.recordStatus !== 'Deleted')
      .map((diagnosis, index) => ({
        ...diagnosis,
        sequenceNo: index + 1,
      }))

    // Step 2: Update diagnoses array with recalculated sequence numbers
    const finalDiagnoses = updatedDiagnoses.map((diagnosis) =>
      diagnosis.recordStatus === 'Deleted'
        ? diagnosis
        : activeDiagnoses.find(
            (activeDiagnosis) => activeDiagnosis.id === diagnosis.id,
          ) || diagnosis,
    )


    // Update the form value with the final diagnoses
    setValue('claimDiagnosis', finalDiagnoses)
    if (activeDiagnoses.length < 4) {
      const claimServiceLines = form.getValues('claimServiceLines')
      claimServiceLines.map((charge) => {
        if (Number(charge.diagnosisPointer1) === activeDiagnoses.length + 1) {
          charge.diagnosisPointer1 = ''
        }
        if (Number(charge.diagnosisPointer2) === activeDiagnoses.length + 1) {
          charge.diagnosisPointer2 = ''
        }
        if (Number(charge.diagnosisPointer3) === activeDiagnoses.length + 1) {
          charge.diagnosisPointer3 = ''
        }
        if (Number(charge.diagnosisPointer4) === activeDiagnoses.length + 1) {
          charge.diagnosisPointer4 = ''
        }
        return charge
      })

      console.log('updated claim service lines ', claimServiceLines)
      form.setValue(`claimServiceLines`, claimServiceLines)
    }
  }

  return (
    <>
      <Flex align="center" gap="2">
        <IcdSearchDropdown
          placeholder="Search ICD-10 Codes"
          onSelectItem={handleSelectedItem}
        />
      </Flex>

      <Flex align="center" justify="start" gap="2" mt="2">
        {claimDiagnoses
          .filter((item) => item.recordStatus === 'Active')
          .map((icdItem) => {
            return (
              <Box
                className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2"
                key={icdItem.diagnosisCode}
              >
                <Flex align="center" justify="center" gap="2">
                  <Text>{icdItem.diagnosisCode}</Text>
                  <Cross1Icon
                    onClick={() =>
                      handleRemoveDiagnosis(icdItem.id, icdItem.diagnosisCode)
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

export { Diagnosis }
