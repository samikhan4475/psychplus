'use client'

import { AsyncAutoCompleteTextField } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { getCptCodesListOptions } from '../../actions'

const CptCodeField = ({ disabled }: { disabled?: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>CPT Code</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getCptCodesListOptions}
        field="cptCode"
        placeholder="Search CPT"
        className="h-6 w-full"
        truncateText={12}
        disabled={disabled}
      />
      <FormFieldError name="cptCode" />
    </FormFieldContainer>
  )
}

export { CptCodeField }
