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
    { label: '', value: '0' },
    { label: '', value: '1' },
    { label: '', value: '2' },
    { label: '', value: '3' },
  ],
}))

export { QUESTIONS, LABELS }
