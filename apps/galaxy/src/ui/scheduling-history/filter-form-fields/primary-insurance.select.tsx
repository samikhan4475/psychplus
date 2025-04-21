'use client'

import { useShallow } from 'zustand/react/shallow'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const PrimaryInsuranceSelect = () => {
  const { insurancePlans } = useStore(
    useShallow((state) => ({
      insurancePlans: state.insurancePlans,
    })),
  )
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Primary Insurance</FormFieldLabel>
      <SelectInput
        field="primaryInsurancePolicyId"
        placeholder="Select"
        loading={insurancePlans?.loading}
        options={insurancePlans?.data ?? []}
        buttonClassName="w-[120px] h-6"
        className="h-6 flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceSelect }
