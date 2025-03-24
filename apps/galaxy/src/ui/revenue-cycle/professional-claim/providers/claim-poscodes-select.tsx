'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const ClaimPOSCodesSelect = () => {
  const { posCodesData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>POS</FormFieldLabel>
      <SelectInput
        field="placeOfService"
        placeholder="Select"
        options={posCodesData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
      <FormFieldError name={`placeOfService`} />
    </FormFieldContainer>
  )
}

export { ClaimPOSCodesSelect }
