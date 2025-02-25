const LABELS = [
  'Please rate the severity of movements observed',
  'None',
  'Minimal',
  'Mild',
  'Moderate',
  'Severe',
]

const QUESTION_CATEGORIES = [
  {
    headingLabels: ['Facial and Oral Movements'],
    questions: [
      '**Muscles of Facial Expression** e.g., movement of forehead, eyebrows, periorbital area, cheeks, including frowning, blinking, smiling, grimacing.',
      '**Lips and Perioral Area** e.g., puckering, pouting, smacking.',
      '**Jaw** e.g., biting, clenching, chewing, mouth opening, lateral movement.',
      '**Tongue** Rate only increase in movement both in and out of mouth. NOT inability to sustain movement. Darting in and out of mouth.',
    ],
  },
  {
    headingLabels: ['Extremity Movements'],
    questions: [
      '**Upper (arms, wrists, hands, fingers)** include choreic movements (i.e., rapid, objectively purposeless, irregular, spontaneous) athetoid movements (i.e., slow, irregular, complex, serpentine). DO NOT INCLUDE TREMOR (i.e., repetitive, regular, rhythmic).',
      '**Lower (legs, knees, ankles, toes)** e.g., lateral knee movement, foot tapping, heel dropping, foot squirming, inversion and eversion of foot.',
    ],
  },
  {
    headingLabels: ['Trunk Movements'],
    questions: [
      '**Neck, shoulders, hips** e.g., rocking, twisting, squirming, pelvic gyrations.',
    ],
  },
  {
    headingLabels: ['Global Judgments'],
    questions: [
      'Severity of abnormal movements overall.',
      'Incapacitation due to abnormal movements.',
      'Patient’s awareness of abnormal movements. Rate only patient’s report.',
    ],
  },
  {
    headingLabels: ['Dental Status', 'Yes', 'No', '', '', ''],
    questions: [
      'Current problems with teeth and/or dentures?',
      'Are dentures usually worn?',
      'Edentia?',
      'Do movements disappear with sleep?',
    ],
  },
]

const AIMS_OPTIONS = [
  { label: '', value: '0' },
  { label: '', value: '1' },
  { label: '', value: '2' },
  { label: '', value: '3' },
  { label: '', value: '4' },
]

const AIMS_DENTAL_STATUS_OPTIONS = [
  { label: '', value: '1' },
  { label: '', value: '0' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
]

let questionCounter = 1
const capitalizeWords = (str: string) =>
  str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, '')

const QUESTIONS = QUESTION_CATEGORIES.flatMap(({ questions, headingLabels }) =>
  questions.map((question, index) => {
    const questionId = `${capitalizeWords(
      headingLabels[0],
    )}Q${questionCounter++}`

    return {
      ...(index === 0 ? { headingLabels } : {}),
      id: questionId,
      value: 0,
      question: question.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),
      options:
        headingLabels[0] === 'Dental Status'
          ? AIMS_DENTAL_STATUS_OPTIONS
          : AIMS_OPTIONS,
    }
  }),
)

export { LABELS, QUESTIONS }
