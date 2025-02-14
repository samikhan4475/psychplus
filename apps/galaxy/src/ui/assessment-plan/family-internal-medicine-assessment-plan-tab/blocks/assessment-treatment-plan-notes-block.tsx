import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
} from '@/components'

const AssessmentTreatmentPlanNotesBlock = () => {
  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <AutoResizeInput
        className="min-h-[80px] min-w-[664px] resize"
        field="assessmentTreatmentPlanNotes"
        maxLength={4000}
      />
      <FormFieldError name="assessmentTreatmentPlanNotes" />
    </FormFieldContainer>
  )
}

export { AssessmentTreatmentPlanNotesBlock }
