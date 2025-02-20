const LABELS = ['Questions', '0', '+1', '+2', '+3', '+4']

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
    case 8:
    case 9:
      options = [
        { label: '', value: '0' },
        { label: '', value: '' },
        { label: '', value: '2' },
        { label: '', value: '' },
        { label: '', value: '4' },
      ]
      break
    default:
      options = [
        { label: '', value: '0' },
        { label: '', value: '1' },
        { label: '', value: '2' },
        { label: '', value: '3' },
        { label: '', value: '4' },
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

export { LABELS, QUESTIONS }
