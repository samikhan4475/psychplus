const LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'Some days',
  'More than half the days',
  'Nearly every day',
]

const QUESTIONS = [
  'Feeling nervous, anxious or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: [
    { label: '0', value: '0' },
    { label: '+1', value: '1' },
    { label: '+2', value: '2' },
    { label: '+3', value: '3' },
  ],
}))

const SCORE_INTERPRETATION_RANGES = [
  { label: 'No Anxiety', color: 'white', min: 0, max: 4 },
  { label: 'Mild Anxiety', color: 'green', min: 5, max: 9 },
  { label: 'Moderate Anxiety', color: 'yellow', min: 10, max: 14 },
  { label: 'Severe Anxiety', color: 'red', min: 15, max: 21 },
]

export { QUESTIONS, SCORE_INTERPRETATION_RANGES, LABELS }
