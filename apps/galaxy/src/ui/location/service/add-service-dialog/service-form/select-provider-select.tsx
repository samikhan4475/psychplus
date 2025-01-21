'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { ServiceSchemaType } from './schema'

const SelectProviderSelect = () => {
  const options = useCodesetOptions(CODESETS.ProviderType)
  const form = useFormContext<ServiceSchemaType>()
  if (!form.watch('isPrimaryProviderRequired')) {
    return null
  }

  return (
    <FormFieldContainer className="flex-row justify-between gap-4">
      <FormFieldLabel className="!text-1 font-medium">
        If Primary Provider Required Select Provider Type?
      </FormFieldLabel>
      <SelectInput
        options={options}
        field="primaryProviderType"
        className="w-full"
        size="1"
        buttonClassName="w-full h-7"
      />
    </FormFieldContainer>
  )
}

export { SelectProviderSelect }
