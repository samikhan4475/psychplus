const LABELS = ['In the past 12 months…', 'No', 'Yes']

const SCORE_INTERPRETATION_RANGES = [
  {
    label: 'No problems reported',
    color: 'white',
    min: 0,
    max: 0,
    rangeTitle: '0',
  },
  { label: 'Low Level', color: 'green', min: 1, max: 2 },
  { label: 'Moderate level', color: 'yellow', min: 3, max: 5 },
  { label: 'Subclinical level', color: 'red', min: 6, max: 8 },
  { label: 'Severe level', color: 'dark red', min: 9, max: 10 },
]

const QUESTIONS = [
  'Have you used drugs other than those required for medical reasons?',
  'Do you abuse more than one drug at a time?',
  'Are you always able to stop using drugs when you want to? (if never use drugs, answer “Yes”)',
  'Have you ever had blackouts or flashbacks as a result of drug use?',
  'Do you ever feel bad or guilty about your drug use?',
  'Does your spouse (or parents) ever complain about your involvement with drugs?',
  'Have you neglected your family because of your use of drugs?',
  'Have you engaged in illegal activities in order to obtain drugs?',
  'Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',
  'Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions, bleeding)?',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options:
    index === 2
      ? [
          { label: '+1', value: '1' },
          { label: '0', value: '0' },
        ]
      : [
          { label: '0', value: '0' },
          { label: '+1', value: '1' },
        ],
}))

export { SCORE_INTERPRETATION_RANGES, LABELS, QUESTIONS }
