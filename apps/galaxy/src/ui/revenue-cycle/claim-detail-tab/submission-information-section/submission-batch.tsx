import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const SubmissionBatch = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Submission Batch #</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('submissionBatchId')}
        disabled={true}
      />
    </FormFieldContainer>
  )
}

export { SubmissionBatch }
