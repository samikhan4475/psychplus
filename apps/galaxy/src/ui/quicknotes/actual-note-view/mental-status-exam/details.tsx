'use client'

import { useSearchParams } from 'next/navigation'
import { SharedCode } from '@/types'
import { MseWidgetSchemaType } from '@/ui/mse/mse-widget/mse-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { renderDataWithOther } from '../utils'
import {
  desiredOrderMse,
  formatDelusionsAndHallucinationsValues,
  mseValueMapping,
  reorderObjectKeys,
} from './utils'

const labelMapping: Record<string, string> = {
  orientation: 'Orientation',
  appearance: 'Appearance',
  behavior: 'Behavior',
  psychomotor: 'Psychomotor',
  speech: 'Speech',
  mood: 'Mood',
  affect: 'Affect',
  thoughtProcess: 'Thought Process',
  memoryHowTested: 'Memory How Tested',
  insight: 'Insight',
  insightHowTested: 'Insight How Tested',
  judgment: 'Judgment',
  judgmentHowTested: 'Judgment How Tested',
  intelligence: 'Intelligence',
  intelligenceHowTested: 'Intelligence How Tested',
  memoryRemoteIntactOther: 'Memory',
  schizophreniaDelusionValues: 'Thought Content Delusion',
  schizophreniaHallucinationsValues: 'Thought Content Hallucinations',
  tcsiYesNo: 'Thought Content Suicidal Ideation',
  tchiYesNo: 'Thought Content Homicidal Ideation',
  thoughtContentOther: 'Thought Content',
  tcDelusionsYesNo: 'Thought Content Delusions',
  tcHallucinationsYesNo: 'Thought Content Hallucinations',
  mmRecentIntactYesNo: 'Memory Recent Intact',
  mmRemoteIntactYesNo: 'Memory Remote Intact',
  siUnDisclosed: 'Thought Content Suicidal Ideation Plan',
  hiUnDisclosed: 'Thought Content Homicidal Ideation Plan',
}

interface Props {
  data: MseWidgetSchemaType
  actualNoteViewVisibility?: boolean
  delusionTypeCodeset: SharedCode[]
  hallucinationTypeCodeset: SharedCode[]
}

enum VisitType {
  New = 'New',
  Initial = 'Initial',
}

interface ValidationRule {
  dependentKey: keyof MseWidgetSchemaType
  value: string
  otherKey: keyof MseWidgetSchemaType
}

const validationRules: Record<string, ValidationRule> = {
  siUnDisclosed: {
    dependentKey: 'tcsiYesNo',
    value: 'yes',
    otherKey: 'siOtherDetails',
  },
  hiUnDisclosed: {
    dependentKey: 'tchiYesNo',
    value: 'yes',
    otherKey: 'hiOtherDetails',
  },
}

const RenderArrayValue: React.FC<{
  key: string
  label: string
  value: string[]
  fieldKey: string
  data: MseWidgetSchemaType
  hallucinationTypeCodeset: SharedCode[]
  delusionTypeCodeset: SharedCode[]
}> = ({
  key,
  label,
  value,
  fieldKey,
  data,
  hallucinationTypeCodeset,
  delusionTypeCodeset,
}) => {
  const sortedValues = mseValueMapping[fieldKey]
    ? value
        .slice()
        .sort(
          (a, b) =>
            mseValueMapping[fieldKey].indexOf(a) -
            mseValueMapping[fieldKey].indexOf(b),
        )
    : value

  if (key === 'schizophreniaHallucinationsValues') {
    return (
      <LabelAndValue
        key={key}
        label={`${label}:`}
        value={formatDelusionsAndHallucinationsValues(
          sortedValues,
          hallucinationTypeCodeset,
        )}
      />
    )
  }

  if (key === 'schizophreniaDelusionValues') {
    return (
      <LabelAndValue
        key={key}
        label={`${label}:`}
        value={formatDelusionsAndHallucinationsValues(
          sortedValues,
          delusionTypeCodeset,
        )}
      />
    )
  }

  return (
    <LabelAndValue
      label={`${label}:`}
      value={renderDataWithOther(fieldKey, sortedValues, data)}
    />
  )
}

const Details = ({
  data,
  actualNoteViewVisibility = false,
  delusionTypeCodeset,
  hallucinationTypeCodeset,
}: Props) => {
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const showHowTested = Object.values(VisitType).includes(
    visitSequence as VisitType,
  )
  const reorderedData = reorderObjectKeys(data, [...desiredOrderMse])

  if (!actualNoteViewVisibility) return null

  return (
    <BlockContainer heading="Mental Status Exam">
      {Object.entries(reorderedData).map(([key, value]) => {
        const label = labelMapping[key] || key.replace(/([A-Z])/g, ' $1')

        if (label.includes('How Tested') && !showHowTested) {
          return null
        }

        if (Array.isArray(value) && value.length > 0) {
          return (
            <RenderArrayValue
              key={key}
              label={label}
              value={value}
              fieldKey={key}
              data={reorderedData}
              hallucinationTypeCodeset={hallucinationTypeCodeset}
              delusionTypeCodeset={delusionTypeCodeset}
            />
          )
        }

        if (typeof value === 'string' && ['yes', 'no'].includes(value)) {
          return <LabelAndValue key={key} label={`${label}:`} value={value} />
        }

        const validationRule = validationRules[key]
        if (
          Array.isArray(value) &&
          validationRule &&
          reorderedData[validationRule.dependentKey] === validationRule.value
        ) {
          const otherDetail = reorderedData[validationRule.otherKey] as string
          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={`Disclosed, ${otherDetail}`}
            />
          )
        }

        return null
      })}
    </BlockContainer>
  )
}

export { Details }
