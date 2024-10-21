'use client'
import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const DateTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className='min-w-fit'>
        Date Type
      </FormFieldLabel>
      <CodesetSelect
        className='w-[102px]'
        name="dateType"
        codeset={CODESETS.ClaimFiltrationDateType}
        size="1"
      />
    </FormFieldContainer>
  )
}
export { DateTypeSelect }
