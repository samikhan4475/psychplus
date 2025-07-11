import { useMemo } from 'react'
import { SharedCode } from '@/types'
import { EnrichedRule, PracticePlanConfigurationRule } from './types'

const useEnrichedRules = (
  configurations: PracticePlanConfigurationRule[],
  codeset: SharedCode[],
): Partial<EnrichedRule>[] => {
  return useMemo(() => {
    return codeset
      .map((rule) => {
        const config = configurations.find((c) => c.code === rule.value)

        const ruleSequenceRaw = rule.attributes?.find(
          (attr) => attr.name === 'RuleSequence',
        )?.value

        const ruleSequence = ruleSequenceRaw ? parseFloat(ruleSequenceRaw) : 999

        return {
          id: config?.id ?? '',
          recordStatus: config?.recordStatus ?? 'Active',
          code: rule.value,
          ruleValue:
            config?.ruleValue ??
            rule.attributes?.find((a) => a.name === 'DEFAULT')?.value ??
            '',
          practicePlanId: config?.practicePlanId ?? '',
          display: rule.display,
          groupingCode: rule.groupingCode,
          attributes: rule.attributes ?? [],
          ruleSequence,
        }
      })
      .sort((a, b) => a.ruleSequence - b.ruleSequence)
  }, [configurations, codeset])
}

export { useEnrichedRules }
