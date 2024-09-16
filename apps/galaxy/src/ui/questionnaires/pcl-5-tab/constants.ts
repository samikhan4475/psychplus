const LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'A little bit',
  'Quite a bit',
  'Moderately',
  'Extremely',
]

const SCORE_INTERPRETATION_RANGES = [
  { label: 'None/Minimal', color: 'white', min: 0, max: 10 },
  { label: 'Mild', color: 'green', min: 11, max: 20 },
  { label: 'Moderate', color: 'yellow', min: 21, max: 40 },
  { label: 'Severe', color: 'red', min: 41, max: 60 },
  { label: 'Very Severe', color: 'dark red', min: 61, max: 80 },
]

export { SCORE_INTERPRETATION_RANGES, LABELS }
