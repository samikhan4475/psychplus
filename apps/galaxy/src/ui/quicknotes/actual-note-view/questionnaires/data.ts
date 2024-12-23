import { QuickNoteSectionItem } from '@/types'
import {
  questionnairesAddToNotesSection,
  QuickNoteSectionName,
} from '../../constants'

const transformAddToNotesData = (
  data: Record<string, QuickNoteSectionItem[]> | undefined,
) => {
  if (!data) {
    return
  }
  const result: { [key: string]: string[] | string } = {}
  questionnairesAddToNotesSection.forEach((element) => {
    const section = data?.[element]?.[0]
    if (!data[element] || section?.sectionItemValue === 'empty') {
      return
    }
    if (element === QuickNoteSectionName.QuestionnaireActualNoteView) {
      result[section.sectionItem] = section.sectionItemValue
      return
    }
    result[section.sectionItem] = section?.sectionItemValue.split(',')
  })
  return result
}

export { transformAddToNotesData }
