import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { SnapIvSchemaType } from '../snap-iv-schema'

const transformIn = (data: QuickNoteSectionItem[]): SnapIvSchemaType => {
  const result: SnapIvSchemaType = {
    InattentionQ1: '',
    InattentionQ2: '',
    InattentionQ3: '',
    InattentionQ4: '',
    InattentionQ5: '',
    InattentionQ6: '',
    InattentionQ7: '',
    InattentionQ8: '',
    InattentionQ9: '',
    'Opposition/DefianceQ19': '',
    'Opposition/DefianceQ20': '',
    'Opposition/DefianceQ21': '',
    'Opposition/DefianceQ22': '',
    'Opposition/DefianceQ23': '',
    'Opposition/DefianceQ24': '',
    'Opposition/DefianceQ25': '',
    'Opposition/DefianceQ26': '',
    'Hyperactivity/ImpulsivityQ10': '',
    'Hyperactivity/ImpulsivityQ11': '',
    'Hyperactivity/ImpulsivityQ12': '',
    'Hyperactivity/ImpulsivityQ13': '',
    'Hyperactivity/ImpulsivityQ14': '',
    'Hyperactivity/ImpulsivityQ15': '',
    'Hyperactivity/ImpulsivityQ16': '',
    'Hyperactivity/ImpulsivityQ17': '',
    'Hyperactivity/ImpulsivityQ18': '',
  }

  data?.forEach((item: QuickNoteSectionItem) => {
    result[item.sectionItem] = item.sectionItemValue
  })
  return result
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (
    schema: SnapIvSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionSnapIV,
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
