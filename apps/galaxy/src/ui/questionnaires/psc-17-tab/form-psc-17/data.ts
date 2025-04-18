import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { Psc17SchemaType } from '../psc-17-schema'

const transformIn = (data: QuickNoteSectionItem[]): Psc17SchemaType => {
  const result: Psc17SchemaType = {
    PscAttentionQ1: '0',
    PscAttentionQ2: '0',
    PscAttentionQ3: '0',
    PscAttentionQ4: '0',
    PscAttentionQ5: '0',
    PscInternalizingQ1: '0',
    PscInternalizingQ2: '0',
    PscInternalizingQ3: '0',
    PscInternalizingQ4: '0',
    PscInternalizingQ5: '0',
    PscExternalizingQ1: '0',
    PscExternalizingQ2: '0',
    PscExternalizingQ3: '0',
    PscExternalizingQ4: '0',
    PscExternalizingQ5: '0',
    PscExternalizingQ6: '0',
    PscExternalizingQ7: '0',
  }

  Object.keys(result).forEach((item) => {
    const value = data.find((i) => i.sectionItem === item)
    if (value) {
      result[item] = value.sectionItemValue
    }
  })
  return result
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (
    schema: Psc17SchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionPsc17,
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
