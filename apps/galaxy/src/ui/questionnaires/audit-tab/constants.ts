const LABELS = ['Questions', '0', '+1', '+2', '+3', '+4']

const SCORE_INTERPRETATION_RANGES = [
  { label: 'Low risk consumption', color: 'white', min: 0, max: 7 },
  { label: 'Harmful alcohol consumption', color: 'yellow', min: 8, max: 14 },
  {
    label: 'Likelihood of alcohol dependence',
    color: 'red',
    min: 15,
    rangeTitle: '>15',
  },
]

const QUESTIONS = [
  'How often do you have a drink containing alcohol?',
  'How many drinks containing alcohol do you have on a typical day when you are drinking?',
  'How often do you have four or more drinks on one occasion?',
  'How often during the last year have you found that you were not able to stop drinking once you had started?',
  'How often during the last year have you failed to do what was normally expected of you because of drinking?',
  'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
  'How often during the last year have you had a feeling of guilt or remorse after drinking?',
  'How often during the last year have you been unable to remember what happened the night before because of your drinking?',
  'Have you or someone else been injured because of your drinking?',
  'Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?',
].map((question, index) => {
  let options

  switch (index) {
    case 0:
      options = [
        { label: 'Never', value: '0' },
        { label: 'Monthly or less', value: '1' },
        { label: '2-4 times a month', value: '2' },
        { label: '2-3 times a week', value: '3' },
        { label: '4 or more times a week', value: '4' },
      ]
      break
    case 1:
      options = [
        { label: '1-2', value: '0' },
        { label: '3 or 4', value: '1' },
        { label: '5 or 6', value: '2' },
        { label: '7-9', value: '3' },
        { label: '10 or more', value: '4' },
      ]
      break
    case 8:
    case 9:
      options = [
        { label: 'Never', value: '0' },
        { label: '', value: '' },
        { label: 'Yes, but not in the last year', value: '2' },
        { label: '', value: '' },
        { label: 'Yes, in the last year', value: '4' },
      ]
      break
    default:
      options = [
        { label: 'Never', value: '0' },
        { label: 'Less than monthly', value: '1' },
        { label: 'Monthly', value: '2' },
        { label: 'Weekly', value: '3' },
        { label: 'Daily or almost daily', value: '4' },
      ]
      break
  }

  return {
    id: `Q${index + 1}`,
    question,
    value: 0,
    options,
  }
})

export { SCORE_INTERPRETATION_RANGES, LABELS, QUESTIONS }
