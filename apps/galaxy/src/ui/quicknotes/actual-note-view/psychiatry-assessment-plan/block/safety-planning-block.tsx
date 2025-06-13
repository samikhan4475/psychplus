import { Flex } from '@radix-ui/themes'
import { Relationship } from '@/types'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { BlockContainer, LabelAndValue } from '../../shared'
import { descriptionMapping, labelMapping, orderMapping } from '../constants'
import { safetyBlockMapOptions } from '../utils'
import { EmergencyResourcesBlock } from './emergency-resources-block'

interface SafetyPlanningBlockProps {
  data: PsychiatryAssessmentPlanTabSchemaType
  patientRelationships: Relationship[]
}

export const SafetyPlanningBlock = ({
  data,
  patientRelationships,
}: SafetyPlanningBlockProps) => {
  if (!data.safetyPlanningIntervention) return null
  const relevantKeys = Object.entries(data)
    .filter(
      ([key, value]) =>
        labelMapping[key] && Array.isArray(value) && value.length > 0,
    )
    .sort((a, b) => orderMapping[a[0] ?? 0] - orderMapping[b[0] ?? 0])

  return (
    <BlockContainer heading="Safety Planning Intervention">
      {relevantKeys.map(([key, value]) => (
        <Flex direction="column" gap="1" key={key}>
          <LabelAndValue
            label={labelMapping[key]}
            value={descriptionMapping[key]}
          />
          <LabelAndValue
            value={safetyBlockMapOptions(key, value as string[], data)}
          />
        </Flex>
      ))}
      <EmergencyResourcesBlock
        patientRelationships={patientRelationships ?? []}
      />
    </BlockContainer>
  )
}
