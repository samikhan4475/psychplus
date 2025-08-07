'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'
import { UpdateMedicationSchema } from './schema'

interface SigInformationProps {
  index: number
}
const SigInformation = ({ index }: SigInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const sigValue = useWatch({
    name: `drugList.${index}.drugSignatureList`,
    control: form.control,
  })
  const signatureText = sigValue?.[0]?.signatureText
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      `drugList.${index}.drugSignatureList.0.signatureText`,
      event.target.value,
    )
  }
  return (
    <Flex gap="2">
      <FormFieldContainer className="w-[33%]">
        <FormFieldLabel required>Refills</FormFieldLabel>
        <TextField.Root
          {...form.register(`drugList.${index}.refills`)}
          className="h-6 w-full"
          size="1"
          maxLength={2}
        />
        <FormFieldError name={`drugList.${index}.refills`} />
      </FormFieldContainer>

      <FormFieldContainer className="w-[67%]">
        <FormFieldLabel required>Sig</FormFieldLabel>
        <TextField.Root
          size="1"
          placeholder="Sig here"
          className="w-full"
          maxLength={300}
          value={signatureText}
          onChange={handleValueChange}
          title={signatureText}
        />
         <FormFieldError name={`drugList.${index}.drugSignatureList.0.signatureText`} />
      </FormFieldContainer>
    </Flex>
  )
}

export { SigInformation }
