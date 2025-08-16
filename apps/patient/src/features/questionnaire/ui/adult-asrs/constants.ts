import { QuestionnaireSchemaType } from '../shared/questionnaire-schema'

const LABELS = [
  'Questions',
  'Never',
  'Rarely',
  'Sometimes',
  'Often',
  'Very Often',
]

const ADULT_ASRS_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
]

const QUESTION_CATEGORIES = [
  {
    heading: 'Part-A',
    questions: [
      {
        id: 'AdultASRSPartAQ1',
        text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
      },
      {
        id: 'AdultASRSPartAQ2',
        text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
      },
      {
        id: 'AdultASRSPartAQ3',
        text: 'How often do you have problems remembering appointments or obligations?',
      },
      {
        id: 'AdultASRSPartAQ4',
        text: 'When you have a task that requires a lot thought, how often do you avoid or delay getting started?',
      },
      {
        id: 'AdultASRSPartAQ5',
        text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
      },
      {
        id: 'AdultASRSPartAQ6',
        text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',
      },
    ],
  },
  {
    heading: 'Part-B',
    questions: [
      {
        id: 'AdultASRSPartBQ1',
        text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?',
      },
      {
        id: 'AdultASRSPartBQ2',
        text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work? ',
      },
      {
        id: 'AdultASRSPartBQ3',
        text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',
      },
      {
        id: 'AdultASRSPartBQ4',
        text: 'How often do you misplace or have difficulty finding things at home or at work?',
      },
      {
        id: 'AdultASRSPartBQ5',
        text: 'How often are you distracted by activity or noise around you?',
      },
      {
        id: 'AdultASRSPartBQ6',
        text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?',
      },
      {
        id: 'AdultASRSPartBQ7',
        text: 'How often do you feel restless or fidgety?',
      },
      {
        id: 'AdultASRSPartBQ8',
        text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?',
      },
      {
        id: 'AdultASRSPartBQ9',
        text: 'How often do you find yourself talking too much when you are in social situations?',
      },
      {
        id: 'AdultASRSPartBQ10',
        text: '16. When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?',
      },
      {
        id: 'AdultASRSPartBQ11',
        text: 'How often do you have difficulty waiting your turn in situations when turn taking is required?',
      },
      {
        id: 'AdultASRSPartBQ12',
        text: 'How often do you interrupt others when they are busy?',
      },
    ],
  },
]

const QUESTIONS = QUESTION_CATEGORIES.flatMap(({ heading, questions }) =>
  questions.map((questionObj, index) => ({
    ...(index === 0 ? { headingLabels: [heading] } : {}),
    id: questionObj.id,
    value: 0,
    question: questionObj.text,
    options: ADULT_ASRS_OPTIONS,
  })),
)

const adultAsrsMapping = QUESTION_CATEGORIES.reduce((acc, category) => {
  category.questions.forEach((question) => {
    acc[question.id] = '0'
  })
  return acc
}, {} as QuestionnaireSchemaType)

export { LABELS, QUESTIONS, adultAsrsMapping }
