'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const FIELD_NAME = 'prescribedStatus'

const PrescribedVia = () => {
  const { watch, setValue, register } = useFormContext()
  const value = watch(FIELD_NAME)
  const codes = useCodesetCodes(CODESETS.PrescribedStatus)

  useEffect(() => {
    if (codes.length > 0 && (value === undefined || value === '')) {
      setValue(FIELD_NAME, codes[0].value)
    }
  }, [codes, setValue, value])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Prescribed Via</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PrescribedStatus}
        className="w-full"
        size="1"
        {...register(FIELD_NAME)}
      />
    </FormFieldContainer>
  )
}

export { PrescribedVia }
