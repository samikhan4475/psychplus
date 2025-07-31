const LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'Some days',
  'More than half the days',
  'Nearly every day',
]

const QUESTIONS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed? Or the opposite being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead or of hurting yourself in some way',
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
  { label: 'No Depression', color: 'white', min: 0, max: 4 },
  { label: 'Mild Depression', color: 'green', min: 5, max: 9 },
  { label: 'Moderate Depression', color: 'yellow', min: 10, max: 14 },
  { label: 'Moderate Severe Depression', color: 'red', min: 15, max: 19 },
  { label: 'Severe Depression', color: 'dark red', min: 20, max: 27 },
]

export { QUESTIONS, SCORE_INTERPRETATION_RANGES, LABELS }
