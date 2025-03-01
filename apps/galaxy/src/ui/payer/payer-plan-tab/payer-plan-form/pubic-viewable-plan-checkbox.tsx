import { useFormContext } from 'react-hook-form'
import { CheckboxInput, FormFieldContainer } from '@/components'
import { SchemaType } from '../schema'

const PublicViewablePlan = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <CheckboxInput
        field="isPublicViewable"
        label="Public Viewable Plan"
        checked={form.watch('isPublicViewable')}
      />
    </FormFieldContainer>
  )
}

export { PublicViewablePlan }
