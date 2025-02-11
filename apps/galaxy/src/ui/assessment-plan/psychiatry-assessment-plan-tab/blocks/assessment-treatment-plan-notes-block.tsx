import { Flex } from '@radix-ui/themes'
import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  ReadMoreDialog,
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
        <AutoResizeInput
          className="min-h-[80px] w-full"
          field="assessmentTreatmentPlanNotes"
        />
        <ReadMoreDialog data={data} />
      </Flex>
      <FormFieldError name="assessmentTreatmentPlanNotes" />
    </FormFieldContainer>
  )
}

export { AssessmentTreatmentPlanNotesBlock }
