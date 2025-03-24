'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { transformInCosigers, transformInOptions } from '../transform'

const CosignerSelect = () => {
  const { cosigners, loading } = useStore((state) => ({
    cosigners: transformInCosigers(state.cosigners),
    loading: state.cosignersLoading,
  }))

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Co-Signer</FormFieldLabel>
      <SelectInput
        options={transformInOptions(cosigners)}
        size="1"
        field="cosignerId"
        buttonClassName="w-[120px] h-6"
        loading={loading}
      />
    </FormFieldContainer>
  )
}
export { CosignerSelect }
