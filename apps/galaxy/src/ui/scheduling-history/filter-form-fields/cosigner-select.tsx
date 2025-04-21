'use client'

import { useShallow } from 'zustand/react/shallow'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const CosignerSelect = () => {
  const { providers } = useStore(
    useShallow((state) => ({
      providers: state.providers,
    })),
  )
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <SelectInput
        field="cosignerStaffId"
        placeholder="Select"
        loading={providers?.loading}
        options={providers?.data ?? []}
        buttonClassName="w-[120px] h-6"
        className="h-6 flex-1"
      />
    </FormFieldContainer>
  )
}

export { CosignerSelect }
