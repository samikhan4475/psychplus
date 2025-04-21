'use client'

import { useShallow } from 'zustand/react/shallow'
import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from '../store'

const SecondaryInsuranceSelect = () => {
  const { insurancePlans } = useStore(
    useShallow((state) => ({
      insurancePlans: state.insurancePlans,
    })),
  )
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Secondary Insurance</FormFieldLabel>
      <SelectInput
        field="secondaryInsurancePolicyId"
        placeholder="Select"
        options={insurancePlans?.data ?? []}
        loading={insurancePlans?.loading}
        buttonClassName="w-[120px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceSelect }
