import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  TextAreaInput,
} from '@/components'

const HospitalCourseBlock = () => {
  return (
    <FormFieldContainer className="flex flex-row items-start justify-start flex-grow gap-1">
      <BlockLabel className="flex-none self-start">
        Hospital Course
      </BlockLabel>
      <Flex className=" w-full max-w-full flex-grow flex-col">
        <TextAreaInput
          field="hospitalCourse"
          className="h-[90px] w-[600px]"
        />
      <FormFieldError name='hospitalCourse'  />
      </Flex>
    </FormFieldContainer>
  )
}

export { HospitalCourseBlock }
