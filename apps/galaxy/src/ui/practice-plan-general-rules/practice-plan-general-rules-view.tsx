'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { cn } from '@/utils'
import { getPracticePlanConfigurationAction } from './actions'
import { updatePracticePlanConfigurationAction } from './actions/update-practice-plan-configuration'
import { RuleInput } from './rule-input'
import { PracticePlanConfigurationRule } from './types'
import { useEnrichedRules } from './useEnrichedRules'

const dependentQuestionnaireRules = new Set([
  'QuestionnaireLogic2',
  'QuestionnaireLogic3',
])

const PracticePlanGeneralRulesView = () => {
  const { id: practicePlanId } = useParams<{ id: string }>()

  const [configurations, setConfigurations] = useState<
    PracticePlanConfigurationRule[]
  >([])
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const codeset = useCodesetCodes(CODESETS.PracticePlanRule)
  const enrichedRules = useEnrichedRules(configurations, codeset)

  const fetchConfigurations = useCallback(async () => {
    setLoading(true)

    const result = await getPracticePlanConfigurationAction(practicePlanId)

    if (result.state === 'error') {
      toast.error(
        result.error ?? 'Failed to fetch practice plan configurations',
      )
      return setLoading(false)
    }

    const fetched = result.data ?? []
    setConfigurations(fetched)

    const initialValues = fetched.reduce<Record<string, string>>(
      (acc, rule) => {
        acc[rule.code] = rule.ruleValue
        return acc
      },
      {},
    )

    setFormValues(initialValues)
    setLoading(false)
  }, [practicePlanId])

  useEffect(() => {
    if (practicePlanId) fetchConfigurations()
  }, [practicePlanId, fetchConfigurations])

  const handleChange = async (code: string, ruleValue: string, id: string) => {
    setLoading(true)
    const result = await updatePracticePlanConfigurationAction({
      id,
      ruleValue,
      code,
      practicePlanId,
    })
    if (result.state === 'error') {
      setLoading(false)
      return toast.error(
        result.error ?? 'Failed to update practice plan configuration',
      )
    }
    toast.success('Practice Plan configuration updated successfully')
    fetchConfigurations()
  }

  if (loading) {
    return <LoadingPlaceholder className="h-[47vh] items-center" />
  }

  if (configurations.length === 0) {
    return (
      <Text size="1" align="center">
        No Configurations Found
      </Text>
    )
  }

  return (
    <Flex direction="column" gap="3">
      {enrichedRules.map((rule) => {
        const isDisabled =
          dependentQuestionnaireRules.has(rule.code ?? '') &&
          formValues['QuestionnaireLogic1'] !== 'Yes'
        return (
          <Flex
            className={isDisabled ? 'pointer-events-none opacity-50' : ''}
            key={`${rule.code}-${rule.ruleSequence}`}
            align="center"
            gap="3"
          >
            <Text
              size="1"
              weight="medium"
              className={cn({
                'ml-6': String(rule.ruleSequence).includes('.'),
              })}
            >
              {rule.ruleSequence}. {rule.display}
            </Text>
            <RuleInput
              rule={rule}
              value={formValues[rule.code!] ?? ''}
              onChange={(val) => handleChange(rule.code!, val, rule.id!)}
            />
          </Flex>
        )
      })}
    </Flex>
  )
}

export { PracticePlanGeneralRulesView }
