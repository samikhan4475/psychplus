const BAI_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
]

const BAI_LABELS = [
  'Read each item and indicate how much you have been bothered by that symptom during the past month, including today, by selecting the number in the corresponding space in the column next to each symptom.',
  'Absent',
  'Mildly but it didn’t bother me much',
  'Moderately- It wasn’t pleasant at times',
  'Severely- It bothered me a lot',
]

const BAI_QUESTIONS = [
  'Numbness or tingling',
  'Feeling hot',
  'Wobbliness in legs',
  'Unable to relax',
  'Fear of worst happening',
  'Dizzy or lightheaded',
  'Heart pounding/racing',
  'Unsteady',
  'Terrified or afraid',
  'Nervous',
  'Feeling of choking',
  'Hands trembling',
  'Shaky/unsteady',
  'Fear of losing control',
  'Difficulty in breathing',
  'Fear of dying',
  'Scared',
  'Indigestion',
  'Faint/lightheaded',
  'Face Flushed',
  'Hot/Cold Sweats',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: BAI_OPTIONS,
}))

const BAI_SCORE_INTERPRETATION_RANGES = [
  { label: 'Very low Anxiety', color: 'green', min: 0, max: 21 },
  { label: 'Moderate Anxiety', color: 'yellow', min: 22, max: 35 },
  {
    label: 'Cause for concern',
    color: 'red',
    min: 36,
    max: 100,
    rangeTitle: '>36',
  },
]

export { BAI_QUESTIONS, BAI_SCORE_INTERPRETATION_RANGES, BAI_LABELS }
