'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { Location } from '@/types'

interface LocationInfoInputProps {
  location: Location
}
const LocationInfoInput = ({ location }: LocationInfoInputProps) => {
  return (
    <FormFieldContainer className="col-span-5 gap-1">
      <FormFieldLabel>Location Info</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled
        value={`${location.name || ''} | ${location.locationType || ''} | ${
          location.address?.city || ''
        } | ${location.address?.state || ''} `}
        className="h-7"
      />
    </FormFieldContainer>
  )
}

export { LocationInfoInput }
