import { Box } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { PsychiatristAssessmentPlanBlock, SafetyPlanningBlock } from './block'

interface Props<T> {
  data: T
  patientRelationships: Relationship[]
  appointment: Appointment
  codesData: QuickNoteSectionItem[]
}

const Details = ({
  data,
  patientRelationships,
  appointment,
  codesData,
}: Props<PsychiatryAssessmentPlanTabSchemaType>) => {
  return (
    <Box>
      <PsychiatristAssessmentPlanBlock
        data={data}
        appointment={appointment}
        codesData={codesData}
      />
      <SafetyPlanningBlock
        data={data}
        patientRelationships={patientRelationships}
      />
    </Box>
  )
}

export { Details }
