import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  ReadMoreDialog,
  TextAreaInput,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'

interface AssessmentTreatmentPlanNotesBlockProps {
  data?: QuickNoteSectionItem[]
}
const AssessmentTreatmentPlanNotesBlock = ({
  data = [],
}: AssessmentTreatmentPlanNotesBlockProps) => {
  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <Flex direction="row" gap="1" align="end" width="100%">
        <TextAreaInput
          field="assessmentTreatmentPlanNotes"
          className="h-[64px] w-[664px]"
          placeHolder="Start writing patient plan"
          maxLength={4000}
          formContainerClassName="!w-fit"
        />
        <ReadMoreDialog data={data} />
      </Flex>
      <FormFieldError name="assessmentTreatmentPlanNotes" />
    </FormFieldContainer>
  )
}

export { AssessmentTreatmentPlanNotesBlock }
