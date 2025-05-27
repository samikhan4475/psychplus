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
  tcsiYesNo: 'Thought Content, Suicidal Ideation',
  tchiYesNo: 'Thought Content, Homicidal Ideation',
  thoughtContentOther: 'Thought Content',
  tcDelusionsYesNo: 'Thought Content, Delusions',
  tcHallucinationsYesNo: 'Thought Content, Hallucinations',
  schizophreniaDelusionValues: 'Thought Content, Delusion',
  schizophreniaHallucinationsValues: 'Thought Content, Hallucinations',
  mmRecentIntactYesNo: 'Memory Recent Intact',
  mmRemoteIntactYesNo: 'Memory Remote Intact',
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

const sortedValues = (value: string[], fieldKey: string) => {
  return mseValueMapping[fieldKey]
    ? value
        .slice()
        .sort(
          (a: string, b: string) =>
            mseValueMapping[fieldKey].indexOf(a) -
            mseValueMapping[fieldKey].indexOf(b),
        )
    : value
}

const THOUGHT_CONTENT_VALUES = (
  fieldKey: string,
  value: string | string[],
  data: MseWidgetSchemaType,
  hallucinationTypeCodeset: SharedCode[],
  delusionTypeCodeset: SharedCode[],
) => {
  if (value !== 'yes') return value;

  const getPlanStatus = (undisclosedField: string[] | undefined) => 
    undisclosedField && undisclosedField.length > 0 ? 'Undisclosed' : 'Disclosed';

  const getOtherDetails = (detailsField: keyof MseWidgetSchemaType) =>
    data[detailsField] ? `, ${data[detailsField]}` : '';

  const getTypesValue = (values: string[] | undefined, codeset: SharedCode[]) => {
    if (!values) return '';
    const sorted = sortedValues(values, fieldKey);
    const typesValue = formatDelusionsAndHallucinationsValues(sorted, codeset);
    return typesValue ? `, Types: ${typesValue}` : '';
  };

  switch (fieldKey) {
    case 'tcsiYesNo':
      return `${value}, Plan: ${getPlanStatus(data.siUnDisclosed)}${getOtherDetails('siOtherDetails')}`;
    
    case 'tchiYesNo':
      return `${value}, Plan: ${getPlanStatus(data.hiUnDisclosed)}${getOtherDetails('hiOtherDetails')}`;
    
    case 'tcDelusionsYesNo':
      return `${value}${getTypesValue(data.schizophreniaDelusionValues, delusionTypeCodeset)}`;
    
    case 'tcHallucinationsYesNo':
      return `${value}${getTypesValue(data.schizophreniaHallucinationsValues, hallucinationTypeCodeset)}`;
    
    default:
      return value;
  }
}

const RenderArrayValue: React.FC<{
  label: string
  value: string[]
  fieldKey: string
  data: MseWidgetSchemaType
}> = ({ label, value, fieldKey, data }) => {
  if (
    [
      'schizophreniaDelusionValues',
      'schizophreniaHallucinationsValues',
      'siUnDisclosed',
      'hiUnDisclosed',
    ].includes(fieldKey)
  ) {
    return null
  }
  const sorted = sortedValues(value, fieldKey)

  return (
    <LabelAndValue
      label={`${label}:`}
      value={renderDataWithOther(fieldKey, sorted, data)}
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
            />
          )
        }

        if (typeof value === 'string' && ['yes', 'no'].includes(value)) {
          const valueData = THOUGHT_CONTENT_VALUES(
            key,
            value,
            reorderedData,
            hallucinationTypeCodeset,
            delusionTypeCodeset,
          )

          return (
            <LabelAndValue key={key} label={`${label}:`} value={valueData} />
          )
        }

        return null
      })}
    </BlockContainer>
  )
}

export { Details }
