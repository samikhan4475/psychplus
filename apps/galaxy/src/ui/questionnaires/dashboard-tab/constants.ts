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
  'Q16',
  'Q17',
  'Q18',
  'Q19',
  'Q20',
  'Q21',
]

const HIDDENQUESTIONNAIRESECTIONNAMES = [
  QuickNoteSectionName.QuickNoteSectionVadprs,
  QuickNoteSectionName.QuickNoteSectionGqasc,
  QuickNoteSectionName.QuickNoteSectionDesii,
  QuickNoteSectionName.QuickNoteSectionBai,
  QuickNoteSectionName.QuickNoteSectionBdi,
  QuickNoteSectionName.QuickNoteSectionCars2St,
  QuickNoteSectionName.QuickNoteSectionMdq,
]

export { QUESTIONS, HIDDENQUESTIONNAIREIDS, HIDDENQUESTIONNAIRESECTIONNAMES }
