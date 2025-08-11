import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { quickNotesSectionsTitles } from '../constants'

const QUESTIONS = Object.values(quickNotesSectionsTitles).map(
  (question, index) => ({
    id: `Q${index + 1}`,
    question,
    value: 0,
  }),
)

const HIDDENQUESTIONNAIREIDS = [
  'Q13', 
  'Q14', 
  'Q15', 
  'Q16'
]

const HIDDENQUESTIONNAIRESECTIONNAMES = [
  QuickNoteSectionName.QuickNoteSectionCopsR, 
  QuickNoteSectionName.QuickNoteSectionAdultAsrs, 
  QuickNoteSectionName.QuickNoteSectionVadprs, 
  QuickNoteSectionName.QuickNoteSectionGqasc
]

export { QUESTIONS, HIDDENQUESTIONNAIREIDS, HIDDENQUESTIONNAIRESECTIONNAMES }
