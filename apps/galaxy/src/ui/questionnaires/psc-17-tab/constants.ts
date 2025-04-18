const PSC_17_LABELS = [
  'Over the past month, how often have you observed your child experiencing any of the following behaviors or emotions?',
  'Never',
  'Sometimes',
  'Often',
]

const SCORE_INTERPRETATION_RANGES_ATTENTION = [
  {
    label: 'Negative for Attention Concerns',
    color: 'white',
    min: 0,
    max: 6,
    rangeTitle: '<7',
  },
  {
    label: 'Positive for Attention Concerns',
    color: 'red',
    min: 7,
    max: 10,
    rangeTitle: '≥7',
  },
]
const TOTAL_SCORE_INTERPRETATION_RANGES_ATTENTION = [
  {
    label: 'Negative for Overall Impairment',
    color: 'white',
    min: 0,
    max: 14,
    rangeTitle: '<15',
  },
  {
    label: 'Positive for Overall Impairment',
    color: 'red',
    min: 15,
    max: 34,
    rangeTitle: '≥15',
  },
]

const SCORE_INTERPRETATION_RANGES_INTERNALIZING = [
  {
    label: 'Negative for Internalizing Concerns',
    color: 'white',
    min: 0,
    max: 4,
    rangeTitle: '<5',
  },
  {
    label: 'Positive for Internalizing Concerns',
    color: 'red',
    min: 5,
    max: 10,
    rangeTitle: '≥5',
  },
]

const SCORE_INTERPRETATION_RANGES_EXTERNALIZING = [
  {
    label: 'Negative for Externalizing Concerns',
    color: 'white',
    min: 0,
    max: 6,
    rangeTitle: '<7',
  },
  {
    label: 'Positive for Externalizing Concerns',
    color: 'red',
    min: 7,
    max: 14,
    rangeTitle: '≥7',
  },
]

const PSC_17_QUESTIONS_ATTENTION = [
  {
    id: 'PscAttentionQ1',
    value: 0,
    question: '1. Fidgety, unable to sit still',
  },
  {
    id: 'PscAttentionQ2',
    value: 0,
    question: '2. Daydreams too much',
  },
  {
    id: 'PscAttentionQ3',
    value: 0,
    question: '3. Has trouble concentrating',
  },
  {
    id: 'PscAttentionQ4',
    value: 0,
    question: '4. Acts as if driven by a motor',
  },
  {
    id: 'PscAttentionQ5',
    value: 0,
    question: '5. Interrupts others',
  },
]
const PSC_17_QUESTIONS_INTERNALIZING = [
  {
    id: 'PscInternalizingQ1',
    value: 0,
    question: '1. Feels sad, unhappy',
  },
  {
    id: 'PscInternalizingQ2',
    value: 0,
    question: '2. Feels hopeless',
  },
  {
    id: 'PscInternalizingQ3',
    value: 0,
    question: '3. Is down on themselves',
  },
  {
    id: 'PscInternalizingQ4',
    value: 0,
    question: '4. Worries a lot',
  },
  {
    id: 'PscInternalizingQ5',
    value: 0,
    question: '5. Seems to be having less fun',
  },
]

const PSC_17_QUESTIONS_EXTERNALIZING = [
  {
    id: 'PscExternalizingQ1',
    value: 0,
    question: '1. Does not listen to rules.',
  },
  {
    id: 'PscExternalizingQ2',
    value: 0,
    question: '2. Does not understand other people’s feelings.',
  },
  {
    id: 'PscExternalizingQ3',
    value: 0,
    question: '3. Teases others.',
  },
  {
    id: 'PscExternalizingQ4',
    value: 0,
    question: '4. Blames others for their troubles.',
  },
  {
    id: 'PscExternalizingQ5',
    value: 0,
    question: '5. Takes things that do not belong to them.',
  },
  {
    id: 'PscExternalizingQ6',
    value: 0,
    question: '6. Refuses to share.',
  },
  {
    id: 'PscExternalizingQ7',
    value: 0,
    question: '7. Fights with other children.',
  },
]

const PSC_17_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
]

enum PSC_17_SECTIONS {
  Attention = 'Attention',
  Internalizing = 'Internalizing',
  Externalizing = 'Externalizing',
}

const PSC_17_TABLES = [
  {
    id: 'Attention',
    label: PSC_17_SECTIONS.Attention,
    data: PSC_17_QUESTIONS_ATTENTION,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_ATTENTION,
  },

  {
    id: 'Internalizing',
    label: PSC_17_SECTIONS.Internalizing,
    data: PSC_17_QUESTIONS_INTERNALIZING,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_INTERNALIZING,
  },
  {
    id: 'Externalizing',
    label: PSC_17_SECTIONS.Externalizing,
    data: PSC_17_QUESTIONS_EXTERNALIZING,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_EXTERNALIZING,
  },
]

export {
  PSC_17_OPTIONS,
  PSC_17_LABELS,
  SCORE_INTERPRETATION_RANGES_ATTENTION,
  SCORE_INTERPRETATION_RANGES_INTERNALIZING,
  SCORE_INTERPRETATION_RANGES_EXTERNALIZING,
  PSC_17_QUESTIONS_ATTENTION,
  PSC_17_QUESTIONS_INTERNALIZING,
  PSC_17_QUESTIONS_EXTERNALIZING,
  PSC_17_TABLES,
  PSC_17_SECTIONS,
  TOTAL_SCORE_INTERPRETATION_RANGES_ATTENTION,
}
