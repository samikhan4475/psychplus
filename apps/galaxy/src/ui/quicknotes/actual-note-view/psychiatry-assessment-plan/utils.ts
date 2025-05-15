import {
  COPING_STRATEGIES_MAPPING,
  RESTRICTING_ACCESS_MAPPING,
  WARNING_SIGNS_MAPPING,
} from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/constants'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { MappingDictionary } from './types'

const MAPPINGS: MappingDictionary = {
  warningSigns: WARNING_SIGNS_MAPPING,
  copingStrategies: COPING_STRATEGIES_MAPPING,
  restrictingAccess: RESTRICTING_ACCESS_MAPPING,
}

const OTHER_SUFFIX = 'OtherDetails'
const OTHER_VALUES = {
  warningSigns: 'wsOther',
  copingStrategies: 'csOther',
  restrictingAccess: 'raOther',
}

export const safetyBlockMapOptions = (
  fieldName: string,
  values: string[],
  allData: PsychiatryAssessmentPlanTabSchemaType,
): string => {
  const mapping = MAPPINGS[fieldName]
  if (!mapping) return values.join(', ')

  const otherValue = OTHER_VALUES[fieldName as keyof typeof OTHER_VALUES]
  const otherDetails =
    allData[
      `${fieldName}${OTHER_SUFFIX}` as keyof PsychiatryAssessmentPlanTabSchemaType
    ]

  const labelMap = new Map<string, string>()
  mapping.forEach((item) => {
    labelMap.set(item.value, item.label)
  })

  return values
    .map((value) => {
      const label = labelMap.get(value)
      if (!label) return value
      if (value === otherValue && otherDetails) {
        return `${label}: ${otherDetails}`
      }
      return label
    })
    .join(', ')
}
