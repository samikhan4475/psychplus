import { CheckboxInput, FormFieldContainer } from '@/components'

const TestPlanCheckbox = () => {
  return (
    <FormFieldContainer>
      <CheckboxInput field="isTest" label="Mark this as a Test Plan" />
    </FormFieldContainer>
  )
}

export { TestPlanCheckbox }
