'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { getPrimaryProviderTypeOptions } from '../../utils'
import { ServiceSchemaType } from './schema'

const PrimaryProviderTypeSelect = () => {
  const form = useFormContext<ServiceSchemaType>()
  const providerTypes = useCodesetOptions(CODESETS.ProviderType)
  const isPrimaryProviderRequired = form.watch('isPrimaryProviderRequired')
  if (!isPrimaryProviderRequired || isPrimaryProviderRequired === 'no') {
    return null
  }
  return (
    <FormFieldContainer className="flex-row justify-between gap-4">
      <FormFieldLabel className="!text-1 font-medium">
        If Primary Provider Required Select Provider Type?
      </FormFieldLabel>
      <SelectInput
        options={getPrimaryProviderTypeOptions(providerTypes)}
        field="primaryProviderType"
        className="w-full"
        size="1"
        buttonClassName="w-full h-7"
      />
    </FormFieldContainer>
  )
}

export { PrimaryProviderTypeSelect }
