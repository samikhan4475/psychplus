import { BlockLabel, FormFieldContainer, TextAreaInput } from '@/components'

const AdditionalTherapyDetailBlock = () => {
  return (
    <FormFieldContainer className="flex flex-row items-start justify-start ">
      <BlockLabel className="flex-none self-start" required>
        Additional Therapy Details
      </BlockLabel>
      <TextAreaInput
        field="therapyDetails"
        className="w-full max-w-full flex-grow h-[90px]"
      />
    </FormFieldContainer>
  )
}

export { AdditionalTherapyDetailBlock }
