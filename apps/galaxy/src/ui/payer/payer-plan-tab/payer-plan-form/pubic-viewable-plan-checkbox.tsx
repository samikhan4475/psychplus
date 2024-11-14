import { CheckboxInput, FormFieldContainer } from '@/components'

const PublicViewablePlan = () => {
  return (
    <FormFieldContainer>
      <CheckboxInput field="isPublicViewable" label="Public Viewable Plan" />
    </FormFieldContainer>
  )
}

export { PublicViewablePlan }
