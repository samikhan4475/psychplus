const LABELS = ['In the past 12 months…', 'No', 'Yes']

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
          { label: '', value: '1' },
          { label: '', value: '0' },
        ]
      : [
          { label: '', value: '0' },
          { label: '', value: '1' },
        ],
}))

export { LABELS, QUESTIONS }
