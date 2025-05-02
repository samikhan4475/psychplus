import { CptCodeKeys, UpdateCptCodes } from '@/features/codes/types'
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
  (
    patientId: string,
    sectionName: NoteSectionName,
    isUnAuthenticated?: boolean,
  ) =>
  async (
    schema: QuestionnaireSchemaType,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<NoteSectionItem[]> => {
    const result: NoteSectionItem[] = []
    let codesResult: NoteSectionItem[] = []
    // Explicitly set pid to zero in case of an anonymous call
    const pid = isUnAuthenticated ? 0 : Number(patientId)
    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid,
          sectionName: sectionName,
          sectionItem: key,
          sectionItemValue: value?.toString() || '',
        })
      }
    })
    if (isUnAuthenticated)
      codesResult.push({
        pid,
        sectionName: NoteSectionName.NoteSectionCodes,
        sectionItem: CptCodeKeys.ADD_ONS_KEY,
        sectionItemValue: '96127',
      })
    else codesResult = await getCodes(patientId, updateCptCodes)

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
