'use client'

import { useShallow } from 'zustand/react/shallow'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const ProviderSelect = () => {
  const { providers } = useStore(
    useShallow((state) => ({
      providers: state.providers,
    })),
  )
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <SelectInput
        field="providerStaffId"
        loading={providers?.loading}
        options={providers?.data ?? []}
        placeholder="Select"
        buttonClassName="w-[150px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
