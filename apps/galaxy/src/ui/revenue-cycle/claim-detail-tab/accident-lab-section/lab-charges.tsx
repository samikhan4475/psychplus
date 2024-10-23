import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const LabCharges = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Lab Charges</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="0"
        {...form.register('labCharges')}
      />
    </FormFieldContainer>
  )
}

export { LabCharges }
