import { TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const ClaimNotes = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Claim Notes</FormFieldLabel>
      <TextArea
        className="w-[100%]"
        maxLength={2048}
        {...form.register('claimNotes')}
      />
    </FormFieldContainer>
  )
}

export { ClaimNotes }
