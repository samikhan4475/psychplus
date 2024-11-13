import { Flex } from '@radix-ui/themes'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<PsychiatryAssessmentPlanTabSchemaType>) => {
  return (
    <BlockContainer heading="Psychiatrist Assessment/Plan">
      <Flex direction="column" gap="2">
        <LabelAndValue value={data.assessmentTreatmentPlanNotes} />

        {data.patientDiscussionCompleted === 'yes' && (
          <LabelAndValue value="Treatment/Therapy options, labs, medications risks/SE, safety plan, & emergency procedures discussed with the patient." />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { Details }
