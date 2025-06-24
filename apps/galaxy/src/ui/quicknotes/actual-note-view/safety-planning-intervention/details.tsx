import { Box } from '@radix-ui/themes'
import { Relationship } from '@/types'
import { SafetyPlanningInterventionSchemaType } from '@/ui/assessment-plan/safety-planning-and-intervention-tab/safety-planning-intervention-schema'
import { SafetyPlanningBlock } from './block'

interface Props<T> {
  data: T
  patientRelationships: Relationship[]
  actualNoteViewVisibility?: boolean
}

const Details = ({
  data,
  patientRelationships,
  actualNoteViewVisibility,
}: Props<SafetyPlanningInterventionSchemaType>) => {
  return actualNoteViewVisibility ? (
    <SafetyPlanningBlock
      data={data}
      patientRelationships={patientRelationships}
    />
  ) : null
}

export { Details }
