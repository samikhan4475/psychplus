import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { type SchemaType } from './edit-referral-form'

const FIELD_NAME: Path<SchemaType> = 'comments'
const FIELD_ID = 'referral-comments-input'

const CommentsInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Comments</FormFieldLabel>
      <TextArea
        size="3"
        id={FIELD_ID}
        placeholder="Add a comment"
        value={form.watch(FIELD_NAME)}
        onChange={(e) => form.setValue(FIELD_NAME, e.target.value)}
      />
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { CommentsInput }
