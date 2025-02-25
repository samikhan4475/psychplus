const LABELS = [
  'How often have you been bothered by any of the following problems?',
]

const OPTIONS = [
  { label: '', value: '0' },
  { label: '', value: '1' },
  { label: '', value: '2' },
  { label: '', value: '3' },
  { label: '', value: '4' },
]

const QUESTIONS = [
  {
    question:
      'How much of your time was occupied by obsessive thoughts? How frequently did these thoughts occur?',
    headingLabels: [
      '1. TIME OCCUPIED BY OBSESSIVE THOUGHTS',
      '0 hr/day',
      '0-1 hr/day',
      '1-3 hr/day',
      '3-8 hr/day',
      '>8 hr/day',
    ],
  },
  {
    question:
      'How much did your obsessive thoughts interfere with your daily life?',
    headingLabels: [
      '2. INTERFERENCE DUE TO OBSESSIVE THOUGHTS',
      'None',
      'Mild',
      'Definite but manageable',
      'Substantial impairment',
      'Incapacitating',
    ],
  },
  {
    question: 'How much distress did your obsessive thoughts cause you?',
    headingLabels: [
      '3. DISTRESS ASSOCIATED WITH OBSESSIVE THOUGHTS',
      'None',
      'Mild',
      'Moderate but manageable',
      'Severe',
      'Near constant, disabling',
    ],
  },
  {
    question: 'How much effort did you make to resist the obsessive thought?',
    headingLabels: [
      '4. RESISTANCE AGAINST OBSESSIONS',
      'Always resist',
      'Much resistance',
      'Some resistance',
      'Often yields',
      'Completely yields',
    ],
  },
  {
    question: 'How much control did you have over your obsessive thoughts?',
    headingLabels: [
      '5. DEGREES OF CONTROL OVER OBSESSIVE THOUGHTS',
      'Complete control',
      'Much control',
      'Some control',
      'Little control',
      'No control',
    ],
  },
  {
    question: 'How much time did you spend performing compulsive behavior?',
    headingLabels: [
      '6. TIME SPENT PERFORMING COMPULSIVE BEHAVIORS',
      '0 hr/day',
      '0-1 hr/day',
      '1-3 hr/day',
      '3-8 hr/day',
      '>8 hr/day',
    ],
  },
  {
    question:
      'How much did your compulsive behaviors interfere with your social or work functioning?',
    headingLabels: [
      '7. INTERFERENCE DUE TO COMPULSIVE BEHAVIOR',
      'None',
      'Mild',
      'Definite but manageable',
      'Substantial impairment',
      'Incapacitating',
    ],
  },
  {
    question:
      'How would you have felt if prevented from performing your compulsion(s)?',
    headingLabels: [
      '8. DISTRESS ASSOCIATED WITH COMPULSIVE BEHAVIOR',
      'None',
      'Mild',
      'Moderate but manageable',
      'Severe',
      'Near constant, disabling',
    ],
  },
  {
    question: 'How much effort did you make to resist the compulsions?',
    headingLabels: [
      '9. RESISTANCE',
      'Always resist',
      'Much resistance',
      'Some resistance',
      'Often yields',
      'Completely yields',
    ],
  },
  {
    question: 'How much control did you have over the compulsive behavior?',
    headingLabels: [
      '10. DEGREES OF CONTROL OVER COMPULSIVE BEHAVIOR',
      'Complete control',
      'Much control',
      'Some control',
      'Little control',
      'No control',
    ],
  },
].map((item, index) => ({
  id: `Q${index + 1}`,
  question: item.question,
  value: 0,
  options: OPTIONS,
  headingLabels: item.headingLabels,
}))

export { LABELS, QUESTIONS }
