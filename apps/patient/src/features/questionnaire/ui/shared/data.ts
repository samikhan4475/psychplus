import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { QuestionnaireSchemaType } from './questionnaire-schema'

const transformIn = (
  data: NoteSectionItem[],
  section?: NoteSectionName,
  result: QuestionnaireSchemaType = {},
): QuestionnaireSchemaType => {
  let value = data
  if (section)
    value = value.filter((item) => item.sectionName === section) || []

  if (Object.keys(result).length > 0)
    value = value.filter((item) => Object.hasOwn(result, item.sectionItem))

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

const questionnaireMapping = (totalQuestions: number) => {
  const result: QuestionnaireSchemaType = {}
  for (let i = 1; i <= totalQuestions; i++) {
    result[`Q${i}`] = '0'
  }

  return result
}

export { transformIn, transformOut, questionnaireMapping }
