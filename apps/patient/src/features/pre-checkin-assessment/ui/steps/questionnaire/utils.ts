import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'

const QuestionnaireQuestionToSectionName: Record<string, NoteSectionName> = {
  Q1: NoteSectionName.NoteSectionPhq9,
  Q2: NoteSectionName.NoteSectionGad7,
  Q3: NoteSectionName.NoteSectionPcl5,
  Q4: NoteSectionName.NoteSectionSnapIV,
  Q5: NoteSectionName.NoteSectionYbocs,
  Q6: NoteSectionName.NoteSectionAudit,
  Q7: NoteSectionName.NoteSectionAims,
  Q8: NoteSectionName.NoteSectionHamD,
  Q9: NoteSectionName.NoteSectionMoca,
  Q10: NoteSectionName.NoteSectionDast10,
  Q11: NoteSectionName.NoteSectionCssrs,
  Q12: NoteSectionName.NoteSectionPsc17,
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
