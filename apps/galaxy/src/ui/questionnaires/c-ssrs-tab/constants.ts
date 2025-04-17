const CSSRS_LABELS = [
  'Over the past month, have you experienced any of the following thoughts or behaviors?',
]

const CSSRS_QUESTIONS_SUICIDAL_IDEATION = [
  {
    id: 'suicidalIdeationQ1',
    value: 0,
    question: 'Wish to be dead',
    options: [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ],
  },
  {
    id: 'suicidalIdeationQ2',
    value: 0,
    question: 'Non-specific active suicidal thoughts',
    options: [
      { label: 'Yes', value: '2' },
      { label: 'No', value: '0' },
    ],
  },
  {
    id: 'suicidalIdeationQ3',
    value: 0,
    question:
      'Active suicidal ideation with any method (not plan) without intent to act',
    options: [
      { label: 'Yes', value: '3' },
      { label: 'No', value: '0' },
    ],
  },
  {
    id: 'suicidalIdeationQ4',
    value: 0,
    question:
      'Active suicidal ideation with some intent to act, without a specific plan',
    options: [
      { label: 'Yes', value: '4' },
      { label: 'No', value: '0' },
    ],
  },
  {
    id: 'suicidalIdeationQ5',
    value: 0,
    question: 'Active suicidal ideation with specific plan and intent',
    options: [
      { label: 'Yes', value: '5' },
      { label: 'No', value: '0' },
    ],
  },
]

const SUICIDAL_BEHAVIOR_OPTIONS = [
  { label: 'Yes', value: '6' },
  { label: 'No', value: '0' },
]

const CSSRS_SUICIDAL_BEHAVIORS = [
  {
    id: 'suicidalBehaviorsQ6',
    value: 0,
    question: 'Actual attempt',
    options: SUICIDAL_BEHAVIOR_OPTIONS,
  },
  {
    id: 'suicidalBehaviorsQ7',
    value: 0,
    question: 'Interrupted attempt',
    options: SUICIDAL_BEHAVIOR_OPTIONS,
  },
  {
    id: 'suicidalBehaviorsQ8',
    value: 0,
    question: 'Aborted attempt',
    options: SUICIDAL_BEHAVIOR_OPTIONS,
  },
  {
    id: 'suicidalBehaviorsQ9',
    value: 0,
    question: 'Preparatory acts or behavior',
    options: SUICIDAL_BEHAVIOR_OPTIONS,
  },
  {
    id: 'suicidalBehaviorsQ10',
    value: 0,
    question: 'Non-suicidal self-injurious behavior',
    options: SUICIDAL_BEHAVIOR_OPTIONS,
  },
]

const CSSRS_TABLES = [
  {
    id: 'suicidalIdeation',
    label: 'Suicidal Ideation',
    data: CSSRS_QUESTIONS_SUICIDAL_IDEATION,
    scoreInterpretation: [],
    isRanges: false,
  },

  {
    id: 'suicidalBehaviors',
    label: 'Suicidal Behaviors',
    data: CSSRS_SUICIDAL_BEHAVIORS,
    scoreInterpretation: [
      { label: 'Low Risk', color: 'white', min: 0, max: 0, rangeTitle: '0' },
      { label: 'Mild Risk', color: 'green', min: 1, max: 2 },
      { label: 'Moderate Risk', color: 'yellow', min: 3, max: 4 },
      { label: 'Severe Risk', color: 'red', min: 5, max: 6 },
    ],
    isRanges: true,
  },
]

const SCORE_INTERPRETATION_RANGES = [
  { label: 'Low Risk', color: 'white', min: 0, max: 0, rangeTitle: '0' },
  { label: 'Mild Risk', color: 'green', min: 1, max: 2 },
  { label: 'Moderate Risk', color: 'yellow', min: 3, max: 4 },
  { label: 'Severe Risk', color: 'red', min: 5, max: 6 },
]

export {
  SUICIDAL_BEHAVIOR_OPTIONS,
  CSSRS_LABELS,
  CSSRS_SUICIDAL_BEHAVIORS,
  CSSRS_TABLES,
  SCORE_INTERPRETATION_RANGES,
}
