import { FormFieldContainer, FormFieldLabel } from '@/components'
import { TextField } from '@radix-ui/themes'

const LocationInfoInput = () => {
  return (
    <FormFieldContainer className="col-span-5 gap-1">
      <FormFieldLabel>Location Info</FormFieldLabel>
      <TextField.Root size="1" disabled placeholder="Willow brooks I 125637MNV | Facility | Texas " className="h-7" />
    </FormFieldContainer>
  )
}

export {LocationInfoInput};