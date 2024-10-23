import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const AuthorizationNumber = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Authorization #</FormFieldLabel>
      <TextField.Root size="1" {...form.register('authorizationNumber')} />
    </FormFieldContainer>
  )
}

export { AuthorizationNumber }
