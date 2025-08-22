const LABELS = ['Questions', 'No', 'Yes']

const SCORE_INTERPRETATION_RANGES = [
  {
    label: 'Meets all 3 criteria: Positive screen for bipolar disorder',
    color: 'green',
    min: 1,
    max: 2,
  },
  {
    label:
      'Does not meet all criteria: Negative screen – no immediate indication of bipolar disorder',
    color: 'red',
    min: 6,
    max: 8,
  },
]

const QUESTIONS = [
  'You felt so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?',
  'You were so irritable that you shouted at people or started fights or arguments?',
  'You felt much more self-confident than usual?',
  'You got much less sleep than usual and found that you didn’t really miss it?',
  'You were more talkative or spoke much faster than usual?',
  'Thoughts raced through your head or you couldn’t slow your mind down?',
  'You were so easily distracted by things around you that you had trouble concentrating or staying on track?',
  'You had more energy than usual?',
  'You were much more active or did many more things than usual?',
  'You were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?',
  'You were much more interested in sex than usual?',
  'You did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?',
  'Spending money got you or your family in trouble?',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: [
    { label: '0', value: '0' },
    { label: '+1', value: '1' },
  ],
}))

const TOTAL_QUESTIONS = 15

const FOLLOW_UP_QUESTIONS = [
  {
    id: 'Q14',
    value: 0,
    question:
      '1. If you checked YES to more than one of the above, have several of these ever happened during the same period of time?',
    options: [
      { label: 'Yes (+1)', value: '1' },
      { label: 'No (0)', value: '0' },
    ],
  },
  {
    id: 'Q15',
    value: 0,
    question:
      '2. How much of a problem did any of these cause you – like being unable to work; having family, money or legal troubles; getting into arguments or fights?',
    options: [
      { label: 'No problem', value: 'no' },
      { label: 'Minor problem', value: 'minor' },
      { label: 'Moderate problem', value: 'moderate' },
      { label: 'Serious problem', value: 'serious' },
    ],
  },
]

export {
  SCORE_INTERPRETATION_RANGES,
  LABELS,
  QUESTIONS,
  FOLLOW_UP_QUESTIONS,
  TOTAL_QUESTIONS,
}
