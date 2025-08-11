import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { VadprsSchemaType } from '../vadprs-schema'
import { VADPRS_QUESTION_IDS, VADPRS_PERFORMANCE_QUESTION_IDS } from '../constants'

const transformIn = (data: QuickNoteSectionItem[]): VadprsSchemaType => {
  const result: VadprsSchemaType = {
    ...Object.fromEntries(
      Object.values(VADPRS_QUESTION_IDS).map(id => [id, '0'])
    ),
    ...Object.fromEntries(
      Object.values(VADPRS_PERFORMANCE_QUESTION_IDS).map(id => [id, '0'])
    ),
  }
  data?.forEach((item: QuickNoteSectionItem) => {
    result[item.sectionItem] = item.sectionItemValue
  })
  return result
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (
    schema: VadprsSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionVadprs,
          sectionItem: key,
          sectionItemValue: value?.toString() || '',
        })
      }
    })

    let codesResult: QuickNoteSectionItem[] = []
    if (isSubmitting) {
      codesResult = await getCodes(patientId, appointmentId, updateCptCodes)
    }
    return [...result, ...codesResult]
  }

export { transformIn, transformOut }
