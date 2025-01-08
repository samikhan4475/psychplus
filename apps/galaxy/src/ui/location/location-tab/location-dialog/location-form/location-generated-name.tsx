import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { LocationSchemaType } from './schema'

const LocationGeneratedName = () => {
  const form = useFormContext<LocationSchemaType>()

  return (
    <FormFieldContainer className="flex flex-col gap-1">
      <FormFieldLabel>ID</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled
        {...form.register('locationNameGenerated')}
      />
    </FormFieldContainer>
  )
}

export { LocationGeneratedName }
