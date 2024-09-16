const QUICKNOTE_SECTION_NAME = 'QuicknoteSectionQuestionnaireSnapIV'
const SNAP_IV_LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'Just a Little',
  'Quite a Bit',
  'Very Much',
]

const SCORE_INTERPRETATION_RANGES_INATTENTION = [
  {
    label: 'Not Significant',
    color: 'white',
    min: 0,
    max: 13,
    rangeTitle: '< 13',
  },
  { label: 'Mild Symptoms', color: 'green', min: 13, max: 17 },
  { label: 'Moderate Symptoms', color: 'yellow', min: 18, max: 22 },
  { label: 'Severe Symptoms', color: 'red', min: 23, max: 27 },
]

const SCORE_INTERPRETATION_RANGES_HYPERACTIVITY = [
  {
    label: 'Not Significant',
    color: 'white',
    min: 0,
    max: 13,
    rangeTitle: '< 13',
  },
  { label: 'Mild Symptoms', color: 'green', min: 13, max: 17 },
  { label: 'Moderate Symptoms', color: 'yellow', min: 18, max: 22 },
  { label: 'Severe Symptoms', color: 'red', min: 23, max: 27 },
]

const SCORE_INTERPRETATION_RANGES_OPPOSITION = [
  {
    label: 'Not Significant',
    color: 'white',
    min: 0,
    max: 8,
    rangeTitle: '< 8',
  },
  { label: 'Mild Symptoms', color: 'green', min: 9, max: 13 },
  { label: 'Moderate Symptoms', color: 'yellow', min: 14, max: 18 },
  { label: 'Severe Symptoms', color: 'red', min: 19, max: 24 },
]

const SNAP_IV_QUESTIONS_INATTENTION = [
  {
    id: 'InattentionQ1',
    value: 0,
    question:
      '1. Often fails to give close attention to details or makes careless mistakes in schoolwork or tasks.',
  },
  {
    id: 'InattentionQ2',
    value: 0,
    question:
      '2. Often has difficulty sustaining attention in tasks or play activities.',
  },
  {
    id: 'InattentionQ3',
    value: 0,
    question: '3. Often does not seem to listen when spoken to directly.',
  },
  {
    id: 'InattentionQ4',
    value: 0,
    question:
      '4. Often does not follow through on instructions and fails to finish schoolwork, chores, or duties.',
  },
  {
    id: 'InattentionQ5',
    value: 0,
    question: '5. Often has difficulty organizing tasks and activities.',
  },
  {
    id: 'InattentionQ6',
    value: 0,
    question:
      '6. Often avoids, dislikes, or reluctantly engages in tasks requiring sustained mental effort.',
  },
  {
    id: 'InattentionQ7',
    value: 0,
    question:
      '7. Often loses things necessary for tasks or activities (e.g., toys, school assignments, pencils, or books.)',
  },
  {
    id: 'InattentionQ8',
    value: 0,
    question: '8. Often is distracted by extraneous stimuli.',
  },
  {
    id: 'InattentionQ9',
    value: 0,
    question: '9. Often is forgetful in daily activities',
  },
]
const SNAP_IV_QUESTIONS_HYPERACTIVITY = [
  {
    id: 'Hyperactivity/ImpulsivityQ10',
    value: 0,
    question: '10. Often fidgets with hands or feet or squirms in seat.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ11',
    value: 0,
    question:
      '11. Often leaves seat in classroom or in other situations in which remaining seated is expected.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ12',
    value: 0,
    question:
      '12. Often runs or climbs excessively in situations in which it is inappropriate.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ13',
    value: 0,
    question:
      '13. Often has difficulty playing or engaging in leisure activities quietly.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ14',
    value: 0,
    question: '14. Often is "on the go" or acts as if "driven by a motor."',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ15',
    value: 0,
    question: '15. Often talks excessively.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ16',
    value: 0,
    question:
      '16. Often blurts out answers before questions have been completed.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ17',
    value: 0,
    question: '17. Often has difficulty awaiting turn.',
  },
  {
    id: 'Hyperactivity/ImpulsivityQ18',
    value: 0,
    question:
      '18. Often interrupts or intrudes on others (e.g., butts into conversations or games).',
  },
]

const SNAP_IV_QUESTIONS_OPPOSITION = [
  {
    id: 'Opposition/DefianceQ19',
    value: 0,
    question: '19. Often loses temper.',
  },
  {
    id: 'Opposition/DefianceQ20',
    value: 0,
    question: '20. Often argues with adults.',
  },
  {
    id: 'Opposition/DefianceQ21',
    value: 0,
    question: '21. Often actively defies or refuses adult requests or rules.',
  },
  {
    id: 'Opposition/DefianceQ22',
    value: 0,
    question: '22. Often deliberately does things that annoy other people.',
  },
  {
    id: 'Opposition/DefianceQ23',
    value: 0,
    question: '23. Often blames others for his/her mistakes or misbehaviors.',
  },
  {
    id: 'Opposition/DefianceQ24',
    value: 0,
    question: '24. Often touchy or easily annoyed by others.',
  },
  {
    id: 'Opposition/DefianceQ25',
    value: 0,
    question: '25. Often is angry and resentful.',
  },
  {
    id: 'Opposition/DefianceQ26',
    value: 0,
    question: '26. Often is spiteful or vindictive.',
  },
]

const SNAP_IV_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
]

const SNAP_IV_TABLES = [
  {
    id: 'Inattention',
    label: 'Inattention',
    data: SNAP_IV_QUESTIONS_INATTENTION,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_INATTENTION,
  },

  {
    id: 'Hyperactivity',
    label: 'Hyperactivity/Impulsivity',
    data: SNAP_IV_QUESTIONS_HYPERACTIVITY,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_HYPERACTIVITY,
  },
  {
    id: 'Opposition',
    label: 'Opposition/Defiance',
    data: SNAP_IV_QUESTIONS_OPPOSITION,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_OPPOSITION,
  },
]

export {
  SNAP_IV_OPTIONS,
  SNAP_IV_LABELS,
  QUICKNOTE_SECTION_NAME,
  SCORE_INTERPRETATION_RANGES_INATTENTION,
  SCORE_INTERPRETATION_RANGES_HYPERACTIVITY,
  SCORE_INTERPRETATION_RANGES_OPPOSITION,
  SNAP_IV_QUESTIONS_INATTENTION,
  SNAP_IV_QUESTIONS_HYPERACTIVITY,
  SNAP_IV_QUESTIONS_OPPOSITION,
  SNAP_IV_TABLES,
}
