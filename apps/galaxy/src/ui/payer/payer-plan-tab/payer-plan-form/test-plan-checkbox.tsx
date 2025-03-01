import { useFormContext } from 'react-hook-form'
import { CheckboxInput, FormFieldContainer } from '@/components'
import { SchemaType } from '../schema'

const TestPlanCheckbox = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer>
      <CheckboxInput
        field="isTest"
        label="Mark this as a Test Plan"
        checked={form.watch('isTest')}
      />
    </FormFieldContainer>
  )
}

export { TestPlanCheckbox }
