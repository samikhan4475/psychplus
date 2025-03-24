'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldError } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { SearchDiagnosisInput } from '../../claim-detail-tab/diagnosis-section'
import { ClaimAddSchemaType } from '../schema'
import DiagnosisList from './diagnosis-list'

const AddClaimDiagnosisView = () => {
  const form = useFormContext<ClaimAddSchemaType>()
  const { getValues } = form

  const claimDiagnosis = form.watch('claimDiagnosis') ?? []

  const handleSelectedDiagnosis = (selectedItem: DiagnosisIcd10Code) => {
    const currentDiaList = getValues('claimDiagnosis') ?? []
    if (currentDiaList.length > 11) {
      toast.error('Cannot add more then 12 diagnosis codes')
      return
    }
    // check if diag code exist dont add
    const isExist = currentDiaList.some(
      (diagnosis) => diagnosis.diagnosisCode === selectedItem.code,
    )

    if (isExist) {
      return
    }

    const newSelectedItem = {
      diagnosisCode: selectedItem.code,
      diagnosisDescription: selectedItem.description,
      sequenceNo: currentDiaList.length + 1,
      recordStatus: 'Active',
    }
    const updatedDiagnoses = [...currentDiaList, newSelectedItem]
    form.setValue('claimDiagnosis', updatedDiagnoses)
    form.trigger(`claimDiagnosis`)
  }
  const handleRemoveDiagnosis = (diagnosisCode?: string) => {
    const claimDiagnosis = [...getValues('claimDiagnosis')]
    const updatedDiagnosisList = claimDiagnosis
      .filter((diagnosis) => diagnosis.diagnosisCode !== diagnosisCode)
      .map((diagnosis, index) => ({
        ...diagnosis,
        sequenceNo: index + 1,
      }))
    form.setValue('claimDiagnosis', updatedDiagnosisList)
  }

  return (
    <Flex direction={'column'}>
      <Flex align="center" gap="2">
        <SearchDiagnosisInput
          placeholder="ICD-10 Codes"
          onSelectItem={handleSelectedDiagnosis}
        />
      </Flex>
      <FormFieldError name={`claimDiagnosis`} />

      <DiagnosisList
        claimDiagnosis={claimDiagnosis}
        handleRemoveDiagnosis={handleRemoveDiagnosis}
      />
    </Flex>
  )
}

export { AddClaimDiagnosisView }
