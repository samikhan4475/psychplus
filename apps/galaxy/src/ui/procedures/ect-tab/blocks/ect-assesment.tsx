import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextAreaInput,
} from '@/components'

const ECTAssesment = () => {
  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <FormFieldLabel className="text-[12px]" required>
        ECT Assesment
      </FormFieldLabel>
      <TextAreaInput
        field="ectAssessment"
        className="h-full w-full"
        placeHolder="Describe Ect Assesment"
      />
      <FormFieldError name={'ectAssessment'} />
    </FormFieldContainer>
  )
}

export { ECTAssesment }
