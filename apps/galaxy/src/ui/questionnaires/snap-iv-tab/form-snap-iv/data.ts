import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { SnapIvSchemaType } from '../snap-iv-schema'

const transformIn = (data: QuickNoteSectionItem[]): SnapIvSchemaType => {
  const result: SnapIvSchemaType = {
    InattentionQ1: '0',
    InattentionQ2: '0',
    InattentionQ3: '0',
    InattentionQ4: '0',
    InattentionQ5: '0',
    InattentionQ6: '0',
    InattentionQ7: '0',
    InattentionQ8: '0',
    InattentionQ9: '0',
    'Opposition/DefianceQ19': '0',
    'Opposition/DefianceQ20': '0',
    'Opposition/DefianceQ21': '0',
    'Opposition/DefianceQ22': '0',
    'Opposition/DefianceQ23': '0',
    'Opposition/DefianceQ24': '0',
    'Opposition/DefianceQ25': '0',
    'Opposition/DefianceQ26': '0',
    'Hyperactivity/ImpulsivityQ10': '0',
    'Hyperactivity/ImpulsivityQ11': '0',
    'Hyperactivity/ImpulsivityQ12': '0',
    'Hyperactivity/ImpulsivityQ13': '0',
    'Hyperactivity/ImpulsivityQ14': '0',
    'Hyperactivity/ImpulsivityQ15': '0',
    'Hyperactivity/ImpulsivityQ16': '0',
    'Hyperactivity/ImpulsivityQ17': '0',
    'Hyperactivity/ImpulsivityQ18': '0',
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
