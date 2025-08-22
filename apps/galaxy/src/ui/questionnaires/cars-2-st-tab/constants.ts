const LABELS = [
  '',
  'Normal',
  'Slight Evidence',
  'Mild',
  'Slightly over mild',
  'Moderate',
  'Slightly over Moderate',
  'Severe',
]

const QUESTIONS = [
  'Relating to People',
  'Imitation',
  'Emotional response',
  'Body Use',
  'Object use',
  'Adaptation to change',
  'Visual response',
  'Listening response',
  'Taste, Smell, and Touch response and use',
  'Fear or nervousness',
  'Verbal Communication',
  'Nonverbal communication',
  'Activity Level',
  'Level and Consistency of Intellectual Response',
  'General Impressions',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: [
    { label: '+1', value: '1' },
    { label: '+1.5', value: '1.5' },
    { label: '+2', value: '2' },
    { label: '+2.5', value: '2.5' },
    { label: '+3', value: '3' },
    { label: '+3.5', value: '3.5' },
    { label: '+4', value: '4' },
  ],
}))

const TOTAL_QUESTIONS = QUESTIONS.length

const SCORE_INTERPRETATION_RANGES = [
  {
    label: 'Minimum',
    color: 'white',
    min: 15,
    max: 27.5,
    rangeTitle: '15-27.5 (for ages 13+)',
  },
  {
    label: 'Moderate',
    color: 'green',
    min: 28,
    max: 34.5,
    rangeTitle: '28-34.5 (for ages 13+)',
  },
  {
    label: 'Severe',
    color: 'red',
    min: 35,
    max: 100,
    rangeTitle: '=>35 (for ages 13+)',
  },
]

const SCORE_INTERPRETATION_RANGES_AGE_12 = [
  {
    label: 'Minimum',
    color: 'white',
    min: 15,
    max: 29.5,
    rangeTitle: '15-29.5 (for ages 12 and younger)',
  },
  {
    label: 'Moderate',
    color: 'green',
    min: 30,
    max: 36.5,
    rangeTitle: '30-36.5 (for ages 12 and younger)',
  },
  {
    label: 'Severe',
    color: 'red',
    min: 37,
    max: 100,
    rangeTitle: '=>37 (for ages 12 and younger)',
  },
]

export {
  QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
  LABELS,
  TOTAL_QUESTIONS,
  SCORE_INTERPRETATION_RANGES_AGE_12,
}
