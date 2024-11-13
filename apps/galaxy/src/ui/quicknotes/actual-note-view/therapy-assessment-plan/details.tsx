import { Flex } from '@radix-ui/themes'
import { TherapyAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/therapy-assessment-plan-tab/therapy-assessment-plan-tab-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<TherapyAssessmentPlanTabSchemaType>) => {
  return (
    <BlockContainer heading="Therapy Assessment/Plan">
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
