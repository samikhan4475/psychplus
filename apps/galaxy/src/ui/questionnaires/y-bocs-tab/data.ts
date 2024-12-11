import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireSchemaType } from '../shared/questionnaires-schema'

const transformIn = (
  data: QuickNoteSectionItem[],
  totalQuestions: number,
): QuestionnaireSchemaType => {
  const result: QuestionnaireSchemaType = {}
  for (let i = 1; i <= totalQuestions; i++) {
    result[`Q${i}`] = ''
  }

  data?.forEach((item: QuickNoteSectionItem) => {
    if (item.sectionItem in result) {
      result[item.sectionItem] = item.sectionItemValue
    }
  })

  return result
}

const transformOut =
  (patientId: string, QuickNoteSectionName: QuickNoteSectionName) =>
  (schema: QuestionnaireSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

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
