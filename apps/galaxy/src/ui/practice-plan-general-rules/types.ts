import { Metadata, SelectOptionType, SharedCode } from '@/types'

interface PracticePlanConfigurationRule {
  id: string
  recordStatus: string
  metadata: Metadata
  code: string
  ruleValue: string
  practicePlanId: string
  ruleSequence: number
}

interface PracticePlanRuleMeta {
  value: string
  display: string
  groupingCode: string
  attributes: SelectOptionType[]
}

type EnrichedRule = PracticePlanConfigurationRule & SharedCode
export {
  type PracticePlanConfigurationRule,
  type EnrichedRule,
  type PracticePlanRuleMeta,
}
