'use client'

import { Box } from '@radix-ui/themes'
import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Language</FormFieldLabel>
      <Box className="flex-1">
        <CodesetSelect
          name="language"
          codeset={CODESETS.CommonLanguages}
          size="1"
          className='flex-1'
        />
      </Box>
    </FormFieldContainer>
  )
}

export { LanguageSelect }
