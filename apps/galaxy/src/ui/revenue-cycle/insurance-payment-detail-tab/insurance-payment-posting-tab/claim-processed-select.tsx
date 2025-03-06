import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { paymentSourceMapping } from './constants'
import { SchemaType } from './schema'

const ClaimProcessedSelect = () => {
  const form = useFormContext<SchemaType>()
  const onChange = (value: string) => {
    form.reset()
    form.setValue('processedAsCode', value)
    form.setValue(
      'paymentSource',
      paymentSourceMapping[value as keyof typeof paymentSourceMapping] ??
        'Primary',
    )
  }

  return (
    <FormFieldContainer>
      <FormFieldLabel>Claim Processed as</FormFieldLabel>
      <CodesetSelect
        name="processedAsCode"
        codeset={CODESETS.ProcessedAsCode}
        size="1"
        onValueChange={onChange}
        className="w-[280px] min-w-fit bg-transparent"
      />
    </FormFieldContainer>
  )
}

export { ClaimProcessedSelect }
