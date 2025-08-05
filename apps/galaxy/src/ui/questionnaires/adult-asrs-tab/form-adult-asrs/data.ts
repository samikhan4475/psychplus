import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { AdultASRSSchemaType } from '../adult-asrs-schema'

const transformIn = (data: QuickNoteSectionItem[]): AdultASRSSchemaType => {
  const result: AdultASRSSchemaType = {
    AdultASRSPartAQ1: '0',
    AdultASRSPartAQ2: '0',
    AdultASRSPartAQ3: '0',
    AdultASRSPartAQ4: '0',
    AdultASRSPartAQ5: '0',
    AdultASRSPartAQ6: '0',
    AdultASRSPartBQ1: '0',
    AdultASRSPartBQ2: '0',
    AdultASRSPartBQ3: '0',
    AdultASRSPartBQ4: '0',
    AdultASRSPartBQ5: '0',
    AdultASRSPartBQ6: '0',
    AdultASRSPartBQ7: '0',
    AdultASRSPartBQ8: '0',
    AdultASRSPartBQ9: '0',
    AdultASRSPartBQ10: '0',
    AdultASRSPartBQ11: '0',
    AdultASRSPartBQ12: '0',
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
    schema: AdultASRSSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionAdultAsrs,
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
