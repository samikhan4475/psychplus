import React from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CodeItem } from '@/types'
import { SearchProcedureCodes } from '@/ui/revenue-cycle/claim-detail-tab/charges-section'
import { SchemaType } from './schema'

const CptCodeSelect = () => {
  const form = useFormContext<SchemaType>()

  const handleProcedureCodeSelected = async (selectedItem: CodeItem) => {
    const { code } = selectedItem
    form.setValue(`cptCodes`, [code])
  }
  return (
    <FormFieldContainer>
      <FormFieldLabel required>CPT Code</FormFieldLabel>
      <Box className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11">
        <SearchProcedureCodes
          fieldName="cptCodes.0"
          disabled={form.formState.isSubmitting}
          onChange={handleProcedureCodeSelected}
        />
      </Box>
      <FormFieldError name="cptCodes.0" />
    </FormFieldContainer>
  )
}

export { CptCodeSelect }
