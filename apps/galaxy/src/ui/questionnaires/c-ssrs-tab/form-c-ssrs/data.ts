import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCodes } from '../../shared/cpt-code-map'
import { CssrsSchemaType } from '../c-ssrs-schema'

const transformIn = (data: QuickNoteSectionItem[]): CssrsSchemaType => {
  const result: CssrsSchemaType = {
    suicidalIdeationQ1: '',
    suicidalIdeationQ2: '',
    suicidalIdeationQ3: '',
    suicidalIdeationQ4: '',
    suicidalIdeationQ5: '',
    suicidalBehaviorsQ6: '',
    suicidalBehaviorsQ7: '',
    suicidalBehaviorsQ8: '',
    suicidalBehaviorsQ9: '',
    suicidalBehaviorsQ10: '',
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
    schema: CssrsSchemaType,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionCssrs,
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
