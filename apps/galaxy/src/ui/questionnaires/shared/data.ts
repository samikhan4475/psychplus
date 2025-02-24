import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from './cpt-code-map'
import { QuestionnaireSchemaType } from './questionnaires-schema'

const transformIn = (
  data: QuickNoteSectionItem[],
  totalQuestions: number,
  section?: QuickNoteSectionName,
): QuestionnaireSchemaType => {
  const result: QuestionnaireSchemaType = {}
  for (let i = 1; i <= totalQuestions; i++) {
    result[`Q${i}`] = '0'
  }

  let value = data
  if (section)
    value = value.filter((item) => item.sectionName === section) || []

  value?.forEach((item: QuickNoteSectionItem) => {
    if (item.sectionItem in result) {
      result[item.sectionItem] = item.sectionItemValue
    }
  })

  return result
}

const transformOut =
  (
    patientId: string,
    QuickNoteSectionName: QuickNoteSectionName,
    appointmentId: string,
  ) =>
  async (
    schema: QuestionnaireSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
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

    let codesResult: QuickNoteSectionItem[] = []
    if (isSubmitting) {
      codesResult = appointmentId
        ? await getCodes(patientId, appointmentId, updateCptCodes)
        : []
    }

    return [...result, ...codesResult]
  }

export { transformIn, transformOut }
