'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'

const POSCodesSelect = () => {
  const { posCodesData } = useRevCycleDataProvider()
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>POS</FormFieldLabel>
      <SelectInput
        field="placeOfService"
        placeholder="Select"
        options={posCodesData}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { POSCodesSelect }
