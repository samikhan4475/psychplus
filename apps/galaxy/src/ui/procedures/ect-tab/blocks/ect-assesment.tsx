import { Flex, TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel, TextAreaInput } from '@/components'

const ECTAssesment = () => {
  return (
    <FormFieldContainer className="w-auto flex flex-col gap-2">
      <FormFieldLabel className='text-[12px]' required>ECT Assesment</FormFieldLabel>
      <TextAreaInput field="ectAssessment" className="w-full h-full"  placeHolder='Describe Ect Assesment' />
    </FormFieldContainer>
  )
}

export { ECTAssesment }
