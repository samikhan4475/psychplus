import { FormFieldContainer, FormFieldError, TextAreaInput } from '@/components'

const AssessmentTreatmentPlanNotesBlock = () => {
  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <TextAreaInput
        field="assessmentTreatmentPlanNotes"
        className="h-[64px] w-[664px]"
        placeHolder="Start writing patient plan"
      />
      <FormFieldError name="assessmentTreatmentPlanNotes" />
    </FormFieldContainer>
  )
}

export { AssessmentTreatmentPlanNotesBlock }
