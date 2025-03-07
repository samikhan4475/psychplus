import { NoteSectionName } from '../note/constants'
import { SECTION_QUESTIONS_MAP } from './constants'

const getTotalQuestions = (sectionName: NoteSectionName): number | undefined =>
  SECTION_QUESTIONS_MAP[sectionName]

export { getTotalQuestions }
