const AIMS_LABELS = [
  'Please rate the severity of movements observed',
  'None',
  'Minimal',
  'Mild',
  'Moderate',
  'Severe',
]

const AIMS_QUESTIONS_FACIAL_AND_ORAL_MOVEMENTS = [
  {
    id: 'FacialAndOralMovementsQ1',
    value: 0,
    boldPart: '1. Muscles of Facial Expression',
    question:
      '1. Muscles of Facial Expression e.g. movement of forehead, eyebrows periorbital area, cheeks, including frowning blinking, smiling, grimacing.',
  },
  {
    id: 'FacialAndOralMovementsQ2',
    value: 0,
    boldPart: '2. Lips and Perioral Area',
    question: '2. Lips and Perioral Area e.g. puckering, pouting, smacking.',
  },
  {
    id: 'FacialAndOralMovementsQ3',
    value: 0,
    boldPart: '3. Jaw',
    question:
      '3. Jaw e.g. biting, clenching, chewing, mouth opening, lateral movement.',
  },
  {
    id: 'FacialAndOralMovementsQ4',
    value: 0,
    boldPart: '4. Tongue',
    question:
      '4. Tongue Rate only increase in movement both in and out of mouth. NOT inability to sustain movement. Darting in and out of mouth.',
  },
]
const AIMS_EXTREMITY_MOVEMENTS = [
  {
    id: 'ExtremityMovementsQ5',
    value: 0,
    boldPart: '5. Upper (arms, wrists, hands, fingers)',
    question:
      '5. Upper (arms, wrists, hands, fingers) include choreic movements (i.e., rapid, objectively purposeless, irregular, spontaneous) athetoid movements (i.e., slow, irregular, complex, serpentine). DO NOT INCLUDE TREMOR (i.e., repetitive, regular, rhythmic).',
  },
  {
    id: 'ExtremityMovementsQ6',
    value: 0,
    boldPart: '6. Lower (legs, knees, ankles, toes)',
    question:
      '6. Lower (legs, knees, ankles, toes) e.g., lateral knee movement, foot tapping, heel dropping, foot squirming, inversion and eversion of foot.',
  },
]

const AIMS_TRUNK_MOVEMENTS = [
  {
    id: 'TrunkMovementsQ7',
    value: 0,
    boldPart: '7. Neck, shoulders, hips,',
    question:
      '7. Neck, shoulders, hips, e.g., rocking, twisting, squirming, pelvic gyrations.',
  },
]

const AIMS_GLOBAL_JUDGMENTS = [
  {
    id: 'GlobalJudgmentsQ8',
    value: 0,
    question: '8. Severity of abnormal movements overall.',
  },
  {
    id: 'GlobalJudgmentsQ9',
    value: 0,
    question: '9. Incapacitation due to abnormal movements.',
  },
  {
    id: 'GlobalJudgmentsQ10',
    value: 0,
    question:
      '10. Patient’s awareness of abnormal movements, Rate only patient’s report.',
  },
]

const AIMS_DENTAL_STATUS = [
  {
    id: 'DentalStatusQ11',
    value: 0,
    question: '11. Current problems with teeth and/or dentures?',
  },
  {
    id: 'DentalStatusQ12',
    value: 0,
    question: '12. Are dentures usually worn?',
  },
  {
    id: 'DentalStatusQ13',
    value: 0,
    question: '13. Edentia?',
  },
  {
    id: 'DentalStatusQ14',
    value: 0,
    question: '14. Do movements disappear with sleep?',
  },
]

const AIMS_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
]

const AIMS_DENTAL_STATUS_OPTIONS = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
]

const AIMS_TABLES = [
  {
    id: 'FacialAndOralMovements',
    label: 'Facial and Oral Movements',
    data: AIMS_QUESTIONS_FACIAL_AND_ORAL_MOVEMENTS,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
  },

  {
    id: 'ExtremityMovements',
    label: 'Extremity Movements',
    data: AIMS_EXTREMITY_MOVEMENTS,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
  },
  {
    id: 'TrunkMovements',
    label: 'Trunk Movements',
    data: AIMS_TRUNK_MOVEMENTS,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
  },
  {
    id: 'GlobalJudgments',
    label: 'Global Judgments',
    data: AIMS_GLOBAL_JUDGMENTS,
    ScoreInterpretation: [],
    isRanges: true,
    isSameOptions: true,
  },
  {
    id: 'DentalStatus',
    label: 'Dental Status',
    data: AIMS_DENTAL_STATUS,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: false,
  },
]

export {
  AIMS_OPTIONS,
  AIMS_LABELS,
  AIMS_EXTREMITY_MOVEMENTS,
  AIMS_DENTAL_STATUS,
  AIMS_TABLES,
  AIMS_DENTAL_STATUS_OPTIONS,
}
