import { Box, Text, TextArea, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const RejectionReason = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Rejection Reason</FormFieldLabel>
      <TextArea
        className="w-[100%]"
        maxLength={2048}
        {...form.register('rejectionReason')}
        disabled={true}
      />
    </FormFieldContainer>
  )
}

export { RejectionReason }
