const LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'Some days',
  'More than half the days',
  'Nearly every day',
]

const SCORE_INTERPRETATION_RANGES = [
  { label: 'No Anxiety', color: 'white', min: 0, max: 4 },
  { label: 'Mild Anxiety', color: 'green', min: 5, max: 9 },
  { label: 'Moderate Anxiety', color: 'yellow', min: 10, max: 14 },
  { label: 'Severe Anxiety', color: 'red', min: 15, max: 21 },
]

export { SCORE_INTERPRETATION_RANGES, LABELS }
