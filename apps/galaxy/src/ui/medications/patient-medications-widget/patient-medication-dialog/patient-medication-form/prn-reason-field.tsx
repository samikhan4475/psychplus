'use client'

import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'

const PrnReasonField = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const disabled = form.watch(getFieldName(index, 'isMedicationAsNeeded'))

  return (
    <FormFieldContainer className="w-[60%]">
      <FormFieldLabel>Reason for PRN</FormFieldLabel>
      <CodesetSelect
        name={getFieldName(index, 'reasonForPrn')}
        codeset={CODESETS.PRNReason}
        size="1"
        disabled={!disabled}
      />
    </FormFieldContainer>
  )
}

export { PrnReasonField }
