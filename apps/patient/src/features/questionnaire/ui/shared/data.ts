import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { QuestionnaireSchemaType } from './questionnaire-schema'

const transformIn = (
  data: NoteSectionItem[],
  section?: NoteSectionName,
): QuestionnaireSchemaType => {
  const result: QuestionnaireSchemaType = {}

  let value = data
  if (section)
    value = value.filter((item) => item.sectionName === section) || []

  value?.forEach((item: NoteSectionItem) => {
    if (item.sectionItem) {
      result[item.sectionItem] = item.sectionItemValue
    }
  })

  return result
}

const transformOut =
  (patientId: string, QuickNoteSectionName: NoteSectionName) =>
  async (schema: QuestionnaireSchemaType): Promise<NoteSectionItem[]> => {
    const result: NoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName,
          sectionItem: key,
          sectionItemValue: value?.toString() || '',
        })
      }
    })

    return result
  }

export { transformIn, transformOut }
