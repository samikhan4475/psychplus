'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from './types'

interface ProvidersSelectProps {
  providerOptions: SelectOptionType[]
}
const ProvidersSelect = ({ providerOptions }: ProvidersSelectProps) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Providers</FormFieldLabel>
      <SelectInput
        placeholder="Select"
        field="provider"
        buttonClassName={buttonClassName}
        options={providerOptions ?? []}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]'
export { ProvidersSelect }
