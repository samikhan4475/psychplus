import labels from './labels.json'
const QUESTIONS_LABELS = labels
const SCORE_INTERPRETATION_RANGES = [
  { label: 'Subclinical Range', color: 'white', min: 0, max: 7 },
  { label: 'Mild', color: 'green', min: 8, max: 15 },
  { label: 'Moderate', color: 'yellow', min: 16, max: 23 },
  { label: 'Severe', color: 'red', min: 24, max: 31 },
  { label: 'Extreme', color: 'dark red', min: 32, max: 40 },
]

const OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
]

const YBOCS_TABLES = [
  'How much of your time was occupied by obsessive thoughts? How frequently did these thoughts occur?',
  'How much of your time was occupied by obsessive thoughts? How frequently did these thoughts occur?',
  'How much distress did your obsessive thoughts cause you?',
  'How much effort did you make to resist the obsessive thought? How often did you try to disregard or turn your attention away from those thoughts as they entered your mind?',
  'How much control did you have over your obsession thoughts? How successful were you in stopping or diverting your obsessive thinking?',
  'How much time did you spend performing compulsive behavior? How frequently did you perform compulsion?',
  'How much did your compulsive behaviors interfere with your social or work functioning?',
  'How would you have felt if prevented from performing your compulsion(s)? How anxious would you have become?',
  'How much effort did you make to resist the compulsions? Or how often did you try to stop the compulsions?',
  'How much control did you have over the compulsive behavior? How successful were you in stopping the ritual(s)?',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: OPTIONS,
  labels: QUESTIONS_LABELS[index],
}))

export { OPTIONS, SCORE_INTERPRETATION_RANGES, YBOCS_TABLES }
