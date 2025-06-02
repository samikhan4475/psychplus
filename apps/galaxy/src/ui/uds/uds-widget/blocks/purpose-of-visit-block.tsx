import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  TextAreaInput,
} from '@/components'

const PurposeOfVisit = () => {
  return (
    <FormFieldContainer>
      <BlockLabel required className="mb-1 text-3">
        Purpose of Visit
      </BlockLabel>
      <TextAreaInput
        className="h-[75px] w-[70%]"
        field="purposeOfVisit"
        placeHolder="Reason"
      />
      <FormFieldError name="purposeOfVisit" />
    </FormFieldContainer>
  )
}

export { PurposeOfVisit }
