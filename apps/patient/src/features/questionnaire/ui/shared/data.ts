import { UpdateCptCodes } from '@/features/codes/types'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { getCodes } from './cpt-code-map'
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
  (patientId: string, NoteSectionName: NoteSectionName) =>
  async (
    schema: QuestionnaireSchemaType,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<NoteSectionItem[]> => {
    const result: NoteSectionItem[] = []
    let codesResult: NoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: NoteSectionName,
          sectionItem: key,
          sectionItemValue: value?.toString() || '',
        })
      }
    })

    codesResult = await getCodes(patientId, updateCptCodes)

    return [...result, ...codesResult]
  }

const questionnaireMapping = (totalQuestions: number) => {
  const result: QuestionnaireSchemaType = {}
  for (let i = 1; i <= totalQuestions; i++) {
    result[`Q${i}`] = '0'
  }

  return result
}

export { transformIn, transformOut, questionnaireMapping }
