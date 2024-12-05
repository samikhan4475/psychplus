import { QuestionnairesTitles } from '../constants'

const QUESTIONS = Object.values(QuestionnairesTitles).map(
  (question, index) => ({
    id: `Q${index + 1}`,
    question,
    value: 0,
  }),
)

export { QUESTIONS }
