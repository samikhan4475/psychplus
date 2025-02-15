'use client'

import { useSearchParams } from 'next/navigation'
import { MseWidgetSchemaType } from '@/ui/mse/mse-widget/mse-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { renderDataWithOther } from '../utils'
import { desiredOrderMse, mseValueMapping, reorderObjectKeys } from './utils'

interface Props<T> {
  data: T
  actualNoteViewVisibility?: boolean
}

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

const Details = ({
  data,
  actualNoteViewVisibility,
}: Props<MseWidgetSchemaType>) => {
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const showHowTested = ['New', 'Initial'].includes(visitSequence)

  const reorderedData = reorderObjectKeys(data, [...desiredOrderMse])

  return actualNoteViewVisibility ? (
    <BlockContainer heading="Mental Status Exam">
      {Object.entries(reorderedData).map(([key, value]) => {
        const label = labelMapping[key] || key.replace(/([A-Z])/g, ' $1')
        if (label.includes('How Tested') && !showHowTested) return null

        if (Array.isArray(value) && value.length > 0) {
          let sortedValues = value

          if (mseValueMapping[key]) {
            const sortingCriteria = (a: string, b: string) =>
              mseValueMapping[key].indexOf(a) - mseValueMapping[key].indexOf(b)
            sortedValues = value.slice().sort(sortingCriteria)
          }

          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={renderDataWithOther(key, sortedValues, reorderedData)}
            />
          )
        } else if (
          typeof value === 'string' &&
          (value === 'yes' || value === 'no')
        ) {
          return <LabelAndValue key={key} label={`${label}:`} value={value} />
        }

        return null
      })}
    </BlockContainer>
  ) : null
}

export { Details }
