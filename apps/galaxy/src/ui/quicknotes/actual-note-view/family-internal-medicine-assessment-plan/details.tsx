import { Flex } from '@radix-ui/themes'
import { FamilyInternalMedicineAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/family-internal-medicine-assessment-plan-tab-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({
  data,
}: Props<FamilyInternalMedicineAssessmentPlanTabSchemaType>) => {
  return (
    <BlockContainer heading="Family/InternalMedicine Assessment/Plan">
      <Flex direction="column" gap="2">
        <LabelAndValue value={data.assessmentTreatmentPlanNotes} />

        {data.patientDiscussionCompleted === 'yes' && (
          <LabelAndValue value="Treatment/FamilyInternalMedicine options, labs, medications risks/SE, safety plan, & emergency procedures discussed with the patient." />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { Details }
