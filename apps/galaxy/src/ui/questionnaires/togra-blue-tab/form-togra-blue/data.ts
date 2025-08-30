import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { TograSchemaType } from '../togra-schema'

const transformIn = (
  data: QuickNoteSectionItem[],
  totalQuestions: number,
): TograSchemaType => {
  const result: TograSchemaType = {} as TograSchemaType

  for (let i = 1; i <= totalQuestions; i++) {
    result[`Q${i}`] = '0'
  }

  result.TograBlueSubmittedDate = ''
  result.TograBlueCompletedDuration = ''
  result.TograBlueStartedAt = ''

  let value = data || []

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
    schema: TograSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
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
