import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'

const QuestionnaireQuestionToSectionName: Record<string, NoteSectionName> = {
  Q1: NoteSectionName.NoteSectionPhq9,
  Q2: NoteSectionName.NoteSectionGad7,
  Q3: NoteSectionName.NoteSectionSnapIV,
  Q4: NoteSectionName.NoteSectionPcl5,
  Q5: NoteSectionName.NoteSectionYbocs,
  Q6: NoteSectionName.NoteSectionAims,
  Q7: NoteSectionName.NoteSectionAudit,
  Q8: NoteSectionName.NoteSectionDast10,
  Q9: NoteSectionName.NoteSectionHamD,
  Q10: NoteSectionName.NoteSectionMoca,
}

const questionnairesToShowOnPreCheckin = (
  data: NoteSectionItem[],
): NoteSectionName[] => {
  return data
    .filter(({ sectionItemValue }) => sectionItemValue === 'Yes')
    .map(({ sectionItem }) => QuestionnaireQuestionToSectionName[sectionItem])
    .filter(Boolean)
}

export { questionnairesToShowOnPreCheckin }
