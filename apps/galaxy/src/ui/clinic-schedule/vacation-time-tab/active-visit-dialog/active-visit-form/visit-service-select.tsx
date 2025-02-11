'use client'

import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const VisitServiceSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0.5">
      <FormFieldLabel>Visit Services</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="visitService"
        codeset={CODESETS.VisitSequence}
      />
    </FormFieldContainer>
  )
}

export { VisitServiceSelect }
