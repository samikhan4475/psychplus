import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const SubmissionValidationMessage = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>System Validation Message</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('submittedDate')}
        disabled={true}
      />
    </FormFieldContainer>
  )
}

export { SubmissionValidationMessage }
