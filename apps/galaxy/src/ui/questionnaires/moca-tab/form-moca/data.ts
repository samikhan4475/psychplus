import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { MocaSchemaType } from '../moca-schema'

const transformIn = (data: QuickNoteSectionItem[]): MocaSchemaType => {
  const result: MocaSchemaType = {
    VisuospatialExecutiveQ1: '',
    VisuospatialExecutiveQ2: '',
    VisuospatialExecutiveQ3: '',
    NamingQ4: '',
    NamingQ5: '',
    NamingQ6: '',
    AttentionQ7: '',
    AttentionQ8: '',
    AttentionQ9: '',
    AttentionQ10: '',
    LanguageQ11: '',
    LanguageQ12: '',
    LanguageQ13: '',
    AbstractionQ14: '',
    AbstractionQ15: '',
    MemoryFaceQ1: '',
    MemoryVelvetQ1: '',
    MemoryChurchQ1: '',
    MemoryDaisyQ1: '',
    MemoryRedQ1: '',
    MemoryFaceQ2: '',
    MemoryVelvetQ2: '',
    MemoryChurchQ2: '',
    MemoryDaisyQ2: '',
    MemoryRedQ2: '',
    DelayedRecallFaceQ1: '',
    DelayedRecallVelvetQ1: '',
    DelayedRecallChurchQ1: '',
    DelayedRecallDaisyQ1: '',
    DelayedRecallRedQ1: '',
    DelayedRecallFaceQ2: '',
    DelayedRecallVelvetQ2: '',
    DelayedRecallChurchQ2: '',
    DelayedRecallDaisyQ2: '',
    DelayedRecallRedQ2: '',
    OrientationDateQ1: '',
    OrientationMonthQ1: '',
    OrientationDayQ1: '',
    OrientationPlaceQ1: '',
    OrientationCityQ1: '',
  }
  data?.forEach((item: QuickNoteSectionItem) => {
    result[item.sectionItem] = item.sectionItemValue
  })
  return result
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (
    schema: MocaSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionMoca,
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
