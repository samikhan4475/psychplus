'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useRevCycleDataProvider } from '../../revCycleContext'
import { Flex } from '@radix-ui/themes'

const ClaimServiceLocationsSelect = () => {
  const { locationsData } = useRevCycleDataProvider()
  return (
    <Flex direction={'column'}>
      <FormFieldContainer>
        <FormFieldLabel required>Service Location</FormFieldLabel>
        <SelectInput
          field="locationId"
          placeholder="Select"
          options={locationsData}
          buttonClassName="w-full h-6"
          className="h-full flex-1"
        />
        <FormFieldError name={`locationId`} />
      </FormFieldContainer>
    </Flex>
  )
}

export { ClaimServiceLocationsSelect }
