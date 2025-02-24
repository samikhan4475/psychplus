import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { MocaSchemaType } from '../moca-schema'

const transformIn = (data: QuickNoteSectionItem[]): MocaSchemaType => {
  const result: MocaSchemaType = {
    VisuospatialExecutiveQ1: '1',
    VisuospatialExecutiveQ2: '1', //default selection according to MLD is 1
    VisuospatialExecutiveQ3: '3', //default selection according to MLD is 3
    NamingQ4: '1',
    NamingQ5: '1',
    NamingQ6: '1',
    AttentionQ7: '1',
    AttentionQ8: '1',
    AttentionQ9: '1',
    AttentionQ10: '3',
    LanguageQ11: '1',
    LanguageQ12: '1',
    LanguageQ13: '1',
    AbstractionQ14: '1',
    AbstractionQ15: '1',
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
