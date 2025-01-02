import React from 'react'
import { SingleSelectChip } from '../../components/single-select-chip'

const PAST_PSYCH_CONDITIONS_BLOCK_OPTIONS = [
  {
    label: 'Depression',
    field: 'depression',
    detailsField: 'depressionAge',
  },
  {
    label: 'Anxiety',
    field: 'anxiety',
    detailsField: 'anxietyAge',
  },
  {
    label: 'Schizophrenia',
    field: 'schizophrenia',
    detailsField: 'schizophreniaAge',
  },
  {
    label: 'Bipolar',
    field: 'bipolar',
    detailsField: 'bipolarAge',
  },
  {
    label: 'Disorder',
    field: 'disorder',
    detailsField: 'disorderAge',
  },
  {
    label: 'Obsessive Thinking',
    field: 'obsessiveThinking',
    detailsField: 'obsessiveThinkingAge',
  },
  {
    label: 'Compulsive Behavior',
    field: 'compulsiveBehavior',
    detailsField: 'compulsiveBehaviorAge',
  },
  {
    label: 'ADHD',
    field: 'adhd',
    detailsField: 'adhdAge',
  },
  {
    label: 'Autism',
    field: 'autism',
    detailsField: 'autismAge',
  },
  {
    label: 'Eating Disorder',
    field: 'eatingDisorder',
    detailsField: 'eatingDisorderAge',
  },
  {
    label: 'Exposure to Trauma',
    field: 'exposureToTrauma',
    detailsField: 'exposureToTraumaAge',
  },
  {
    label: 'Cutting/Self-Harm Behavior',
    field: 'cuttingSelfHarmBehavior',
    detailsField: 'cuttingSelfHarmBehaviorAge',
  },
  {
    label: 'Problems with Sleep',
    field: 'problemsWithSleep',
    detailsField: 'problemsWithSleepAge',
  },
  {
    label: 'Dementia',
    field: 'dementia',
    detailsField: 'dementiaAge',
  },
  {
    label: 'Panic Attacks',
    field: 'panicAttacks',
    detailsField: 'panicAttacksAge',
  },
  {
    label: 'Personality Disorder',
    field: 'personalityDisorder',
    detailsField: 'personalityDisorderAge',
  },
  {
    label: 'Intellectual Disability',
    field: 'intellectualDisability',
    detailsField: 'intellectualDisabilityAge',
  },
]

const PastConditions = () => {
  return (
    <>
      {PAST_PSYCH_CONDITIONS_BLOCK_OPTIONS.map((option) => (
        <SingleSelectChip
          key={option.field}
          field={option.field}
          label={option.label}
          details={{
            type: option.field === 'other' ? 'text' : 'number',
            label: option.field === 'other' ? 'Details' : 'Age Started',
            field: option.detailsField,
          }}
        />
      ))}
    </>
  )
}

export default PastConditions
