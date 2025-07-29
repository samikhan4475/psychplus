'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const FIELD_NAME = 'prescribedStatus'

const PrescribedVia = () => {
  const { watch, setValue } = useFormContext()
  const value = watch(FIELD_NAME)

  useEffect(() => {
    if (!value) {
      setValue(FIELD_NAME, 'Pharmacy')
    }
  }, [value, setValue])
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
