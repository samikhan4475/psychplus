import { Box } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { PsychiatristAssessmentPlanBlock } from './block'

interface Props<T> {
  data: T
  appointment: Appointment
  codesData: QuickNoteSectionItem[]
}

const Details = ({
  data,
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
    </Box>
  )
}

export { Details }
