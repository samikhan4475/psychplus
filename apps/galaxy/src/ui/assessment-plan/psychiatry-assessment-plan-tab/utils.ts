import { GroupSelectOption } from '@/components'
import { CptCode, QuickNoteSectionItem, SelectOptionType } from '@/types'
import {
  COPING_STRATEGIES_MAPPING,
  HIGH_CODES,
  MILD_CODES,
  MODERATE_CODES,
  RESTRICTING_ACCESS_MAPPING,
  WARNING_SIGNS_MAPPING,
} from './constants'
import { RiskLevel } from './types'

const detailsTriggerValue = <T extends SelectOptionType>(
  mappings: T[],
  specialValue: string,
  detailsField: string,
): GroupSelectOption<string>[] => {
  return mappings.map((mapping) => ({
    label: mapping.label,
    value: mapping.value,
    ...(mapping.value === specialValue && {
      details: {
        type: 'text',
        field: detailsField,
        maxLength: 500,
        isRequired: true,
      },
    }),
  }))
}

export const WARNING_SIGNS_OPTIONS = detailsTriggerValue(
  WARNING_SIGNS_MAPPING,
  'wsOther',
  'warningSignsOtherDetails',
)

export const RESTRICTING_ACCESS_OPTIONS = detailsTriggerValue(
  RESTRICTING_ACCESS_MAPPING,
  'raOther',
  'restrictingAccessOtherDetails',
)

export const COPING_STRATEGIES_OPTIONS = detailsTriggerValue(
  COPING_STRATEGIES_MAPPING,
  'csOther',
  'copingStrategiesOtherDetails',
)

const RISK_LEVEL_CODES: Record<RiskLevel, Set<string>> = {
  mild: new Set(MILD_CODES),
  moderate: new Set(MODERATE_CODES),
  high: new Set(HIGH_CODES),
}

export const getRiskLevel = (
  codes: QuickNoteSectionItem[],
  cptCode?: CptCode[],
): RiskLevel | null => {
  const codesData = codes?.filter(
    (code) => code.sectionItem === 'cptPrimaryCodes',
  )

  let code = ''
  if (!codesData?.length) {
    const defaultCode = cptCode?.find((c) => c.isDefault)
    if (!defaultCode) {
      code = 'not specified'
    } else {
      code = defaultCode.code
    }
  } else {
    code = codesData?.[0].sectionItemValue
  }

  if (RISK_LEVEL_CODES.high.has(code)) return 'high'
  if (RISK_LEVEL_CODES.moderate.has(code)) return 'moderate'
  if (RISK_LEVEL_CODES.mild.has(code)) return 'mild'

  return null
}
