import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const ReferralNumber = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Referral #</FormFieldLabel>
      <TextField.Root size="1" {...form.register('referralNumber')} />
    </FormFieldContainer>
  )
}

export { ReferralNumber }
