'use client'

import { Box } from '@radix-ui/themes'
import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Gender</FormFieldLabel>
      <Box className="flex-1">
        <CodesetSelect
          name="gender"
          codeset={CODESETS.Gender}
          size="1"
          className="flex-1"
        />
      </Box>
    </FormFieldContainer>
  )
}

export { GenderSelect }
