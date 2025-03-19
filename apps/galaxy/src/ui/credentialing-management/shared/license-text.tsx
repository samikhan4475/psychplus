import { FormFieldContainer, FormFieldLabel } from '@/components'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'

const LicenseText = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>License #</FormFieldLabel>
      <TextField.Root
        placeholder="Search by Name"
        size="1"
        {...form.register('licenseNumber')}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { LicenseText }
