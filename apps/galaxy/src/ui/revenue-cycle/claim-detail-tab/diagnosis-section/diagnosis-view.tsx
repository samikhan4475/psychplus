'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldError } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchDiagnosisInput } from './search-diagnosis-input'

const DiagnosisView = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { getValues } = form
  const claimDiagnosis = form.watch('claimDiagnosis') ?? []
  const isDisabled = form.formState.disabled
  const handleSelectedItem = (selectedItem: DiagnosisIcd10Code) => {
    const currentDiagnosisList = getValues('claimDiagnosis')
    if (currentDiagnosisList.length > 11) {
      toast.error('Cannot add more then 12 diagnosis codes')
      return
    }
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

    const claimServiceLines = form.getValues('claimServiceLines') ?? []
    claimServiceLines.forEach((charge) => {
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
    })
    form.setValue(`claimServiceLines`, claimServiceLines)
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
    const activeDiagnosis = updatedDiagnosis
      .filter((diagnosis) => diagnosis.recordStatus !== 'Deleted')
      .map((diagnosis, index) => ({
        ...diagnosis,
        sequenceNo: index + 1,
      }))

    const finalDiagnoses = updatedDiagnosis.map((diagnosis) => {
      if (diagnosis.recordStatus === 'Deleted') {
        return diagnosis
      }
      let activeDiagnose
      if (diagnosis.id) {
        activeDiagnose = activeDiagnosis.find(
          (active) => active.id === diagnosis.id,
        )
      } else {
        activeDiagnose = activeDiagnosis.find(
          (active) => active.diagnosisCode === diagnosis.diagnosisCode,
        )
      }

      return activeDiagnose ?? diagnosis
    })

    const claimServiceLines = form.getValues('claimServiceLines') ?? []
    type DiagnosisPointerKey = `diagnosisPointer${1 | 2 | 3 | 4}`

    type ClaimServiceLine = {
      [K in DiagnosisPointerKey]?: string
    }

    claimServiceLines.forEach((charge: ClaimServiceLine) => {
      for (let i = activeDiagnosis.length + 1; i <= 4; i++) {
        const key = `diagnosisPointer${i}` as DiagnosisPointerKey
        charge[key] = ''
      }
    })

    form.setValue('claimServiceLines', claimServiceLines)
    form.setValue('claimDiagnosis', finalDiagnoses)
  }

  return (
    <>
      <Flex align="center" gap="2">
        <SearchDiagnosisInput
          placeholder="ICD-10 Codes"
          onSelectItem={handleSelectedItem}
          claimDiagnosis={claimDiagnosis ?? []}
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
                  {!isDisabled && (
                    <Cross1Icon
                      onClick={() =>
                        removeDiagnosis(icdItem.id, icdItem.diagnosisCode)
                      }
                    />
                  )}
                </Flex>
              </Box>
            )
          })}
      </Flex>
      <FormFieldError name={`claimDiagnosis.claimDiagnosis`} />
    </>
  )
}

export { DiagnosisView }
