import { NoteSectionName } from '../note/constants'
import { SECTION_QUESTIONS_MAPPING, TOTAL_QUESTIONS } from './constants'
import { QuestionnaireSchemaType } from './ui/shared/questionnaire-schema'

const getTotalQuestions = (sectionName: NoteSectionName): number | undefined =>
  Object.fromEntries(
    Object.entries(TOTAL_QUESTIONS).map(([key, questions]) => [key, questions]),
  )[sectionName]

const getQuestionnaireMapping = (
  sectionName: NoteSectionName,
): QuestionnaireSchemaType | undefined => SECTION_QUESTIONS_MAPPING[sectionName]

export { getTotalQuestions, getQuestionnaireMapping }
