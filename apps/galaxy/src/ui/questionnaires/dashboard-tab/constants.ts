import { quickNotesSectionsTitles } from '../constants'

const QUESTIONS = Object.values(quickNotesSectionsTitles).map(
  (question, index) => ({
    id: `Q${index + 1}`,
    question,
    value: 0,
  }),
)

export { QUESTIONS }
