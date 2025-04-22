import { capitalizeFirstLetter, capitalizeName } from '@psychplus-v2/utils'

const LABELS = [
  'Over the past month, how often have you observed your child experiencing any of the following behaviors or emotions?',
  'Never',
  'Sometimes',
  'Often',
]

const OPTIONS = [
  { label: '', value: '0' },
  { label: '', value: '1' },
  { label: '', value: '2' },
]

const QUESTION_CATEGORIES = [
  {
    heading: 'attention',
    questions: [
      'Fidgety, unable to sit still',
      'Daydreams too much',
      'Has trouble concentrating',
      'Acts as if driven by a motor',
      'Interrupts others',
    ],
  },
  {
    heading: 'internalizing',
    questions: [
      'Feels sad, unhappy',
      'Feels hopeless',
      'Is down on themselves',
      'Worries a lot',
      'Seems to be having less fun',
    ],
  },
  {
    heading: 'externalizing',
    questions: [
      'Does not listen to rules',
      'Does not understand other people’s feelings',
      'Teases others',
      'Blames others for their troubles',
      'Takes things that do not belong to them',
      'Refuses to share',
      'Fights with other children',
    ],
  },
]

const QUESTIONS = QUESTION_CATEGORIES.flatMap(({ heading, questions }) =>
  questions.map((text, index) => ({
    id: `Psc${capitalizeFirstLetter(heading)}Q${index + 1}`,
    value: 0,
    question: text,
    options: OPTIONS,
    ...(index === 0 && { headingLabels: [capitalizeName(heading)] }),
  })),
)

export { QUESTIONS, LABELS }
