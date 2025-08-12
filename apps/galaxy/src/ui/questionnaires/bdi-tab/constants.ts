const BDI_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
]

const BDI_QUESTION_LABELS = [
  'For each item choose the value the closely matches how you are feeling as compared to your norm.',
  'Not at all/ Normal ',
  'Slightly feel/change',
  'Moderately feel/change',
  'Severely feel/change',
]

const BDI_QUESTIONS = [
  'Do you feel sadness?',
  'Are you discouraged about your future?',
  'Do you feel like a failure?',
  'Do you feel a loss of pleasure?',
  'Do you feel guilty?',
  'Do you feel you are being punished?',
  'Do you feel disappointed in self?',
  'Do you feel self-critical?',
  'Do you have thoughts of suicide?',
  'Is there a change in how often you cry?',
  'Do you feel irritable?',
  'Do you have a loss of interest in activities?',
  'Do you feel indecisive?',
  'Do you feel a negative change in appearance?',
  'Do you have difficulty working?',
  'Are there changes in sleep pattern?',
  'Do you feel tiredness/fatigue?',
  'Do you have a change in appetite?',
  'Is there a change in your weight?',
  'Do you have a change in physical worries?',
  'Do you have a loss of interest in sex?',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: BDI_OPTIONS,
}))

const BDI_SCORE_INTERPRETATION_RANGES = [
  { label: 'Normal', color: 'white', min: 1, max: 10 },
  { label: 'Mild mood disturbance', color: 'green', min: 11, max: 16 },
  {
    label: 'Borderline clinical depression',
    color: 'blue',
    min: 17,
    max: 20,
  },
  {
    label: 'Moderate depression',
    color: 'yellow',
    min: 21,
    max: 30,
  },
  {
    label: 'Severe depression over',
    color: 'orange',
    min: 31,
    max: 40,
  },
  {
    label: 'Extreme depression',
    color: 'red',
    min: 41,
    max: 63,
  },
]

export { BDI_QUESTIONS, BDI_SCORE_INTERPRETATION_RANGES, BDI_QUESTION_LABELS }
