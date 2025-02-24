import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { AimsSchemaType } from '../aims-schema'

const transformIn = (data: QuickNoteSectionItem[]): AimsSchemaType => {
  const result: AimsSchemaType = {
    FacialAndOralMovementsQ1: '0',
    FacialAndOralMovementsQ2: '0',
    FacialAndOralMovementsQ3: '0',
    FacialAndOralMovementsQ4: '0',
    ExtremityMovementsQ5: '0',
    ExtremityMovementsQ6: '0',
    TrunkMovementsQ7: '0',
    GlobalJudgmentsQ8: '0',
    GlobalJudgmentsQ9: '0',
    GlobalJudgmentsQ10: '0',
    DentalStatusQ11: '',
    DentalStatusQ12: '',
    DentalStatusQ13: '',
    DentalStatusQ14: '',
  }
  data?.forEach((item: QuickNoteSectionItem) => {
    result[item.sectionItem] = item.sectionItemValue
  })
  return result
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (
    schema: AimsSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionAims,
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
