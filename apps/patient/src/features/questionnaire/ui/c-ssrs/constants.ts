import { capitalizeName } from '@psychplus-v2/utils'

const LABELS = [
  'Over the past month, have you experienced any of the following thoughts or behaviors?',
  'Yes',
  'No',
]

const YES_NO_OPTIONS = (yesValue: string) => [
  { label: '', value: yesValue },
  { label: '', value: '0' },
]

const QUESTION_CATEGORIES = [
  {
    heading: 'suicidal Ideation',
    questions: [
      { text: 'Wish to be dead', options: YES_NO_OPTIONS('1') },
      {
        text: 'Non-specific active suicidal ideation',
        options: YES_NO_OPTIONS('2'),
      },
      {
        text: 'Active suicidal ideation with any method (no plan) without intent to act',
        options: YES_NO_OPTIONS('3'),
      },
      {
        text: 'Active suicidal ideation with some intent to act, without a specific plan',
        options: YES_NO_OPTIONS('4'),
      },
      {
        text: 'Active suicidal ideation with specific plan and intent',
        options: YES_NO_OPTIONS('5'),
      },
    ],
  },
  {
    heading: 'suicidal Behaviors',
    questions: [
      { text: 'Actual attempt', options: YES_NO_OPTIONS('6') },
      { text: 'Interrupted attempt', options: YES_NO_OPTIONS('6') },
      { text: 'Aborted attempt', options: YES_NO_OPTIONS('6') },
      { text: 'Preparatory acts or behavior', options: YES_NO_OPTIONS('6') },
      {
        text: 'Non-suicidal self-injurious behavior',
        options: YES_NO_OPTIONS('6'),
      },
    ],
  },
]

const QUESTIONS = QUESTION_CATEGORIES.flatMap(
  ({ heading, questions }, categoryIndex) =>
    questions.map((questionObj, index) => ({
      ...(index === 0 ? { headingLabels: [capitalizeName(heading)] } : {}),
      id: `${heading.replace(/\s/g, '')}Q${index + 1 + categoryIndex * 5}`,
      value: 0,
      question: questionObj.text,
      options: questionObj.options,
    })),
)

export { QUESTIONS, LABELS }
