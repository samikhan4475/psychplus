'use client'

import { useShallow } from 'zustand/react/shallow'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const LocationSelect = () => {
  const { clinics } = useStore(
    useShallow((state) => ({
      clinics: state.clinics,
    })),
  )

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        buttonClassName={buttonClassName}
        options={clinics?.data ?? []}
        loading={clinics?.loading}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[109px]'
export { LocationSelect }
