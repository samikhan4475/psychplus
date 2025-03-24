'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'

interface LocationInfoInputProps {
  info: string
}
const LocationInfoInput = ({ info }: LocationInfoInputProps) => {
  return (
    <FormFieldContainer className="col-span-5 gap-1">
      <FormFieldLabel>Location Info</FormFieldLabel>
      <TextField.Root size="1" disabled value={info} className="h-7" />
    </FormFieldContainer>
  )
}

export { LocationInfoInput }
