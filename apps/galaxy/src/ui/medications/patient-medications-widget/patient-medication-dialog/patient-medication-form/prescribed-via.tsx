'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const FIELD_NAME = 'prescribedStatus'

const PrescribedVia = () => {
  const { watch, setValue } = useFormContext()
  const value = watch(FIELD_NAME)
  const codes = useCodesetCodes(CODESETS.PrescribedStatus)

  useEffect(() => {
    if (!value && codes.length > 0) setValue(FIELD_NAME, codes[0].value)
  }, [value, codes, setValue])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Prescribed Via</FormFieldLabel>
      <CodesetSelect
        name={FIELD_NAME}
        codeset={CODESETS.PrescribedStatus}
        className="w-full"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PrescribedVia }
