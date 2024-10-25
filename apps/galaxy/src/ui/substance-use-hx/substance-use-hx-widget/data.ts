import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import {
  DRUGS_OPTIONS,
  TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE,
  TOBACCO_OPTIONS,
} from './constants'
import { SubstanceUseHxWidgetSchemaType } from './substance-use-hx-schema'

const transformIn = (
  value: QuickNoteSectionItem[],
): SubstanceUseHxWidgetSchemaType => {
  const result: Record<
    string,
    number | string | undefined | boolean | string[]
  > = {
    tobacco: undefined,
    tobaccoChewSmoke: undefined,
    smokePacks: undefined,
    smokingCessationOption: undefined,
    counselingOption: undefined,
    smokingCessationDiscussionDuration: undefined,
    otherTobacco: undefined,
    alcohol: undefined,
    drugs: undefined,
    opioids: undefined,
    opioidsDetails: undefined,
    sedative: undefined,
    sedativeDetails: undefined,
    cocaine: undefined,
    cocaineDetails: undefined,
    amphetamine: undefined,
    amphetamineDetails: undefined,
    pcp: undefined,
    pcpDetails: undefined,
    inhalants: undefined,
    inhalantsDetails: undefined,
    questionnaire: undefined,
    briefIntervention: undefined,
    referralTreatment: undefined,
    alcoholSubstanceCessationDiscussionDuration: undefined,
    otherAlcoholDrugs: undefined,
  }

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (key === 'referralTreatment') {
      const list = itemValue.split(',')
      result[key] = list || []
    } else if (TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE.includes(key)) {
      result[key] = itemValue
    } else if (TOBACCO_OPTIONS.includes(key)) {
      result[key] = itemValue
    } else if (DRUGS_OPTIONS.includes(key)) {
      const detailKey = `${key}Details`
      result[detailKey] = itemValue
      result[key] = true
    } else {
      result[key] = itemValue === 'true' ? true : false
    }
  })

  return result as SubstanceUseHxWidgetSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: Record<string, undefined>): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    }

    if (schema.alcohol === 'no' && schema.drugs === 'no') {
      schema['briefIntervention'] = undefined
    }
    if (schema.tobacco === 'no') {
      TOBACCO_OPTIONS.forEach((option) => {
        schema[option] = undefined
      })
    }
    if (schema.drugs === 'no') {
      DRUGS_OPTIONS.forEach((option) => {
        const detailOption = `${option}Details`
        schema[option] = undefined
        schema[detailOption] = undefined
      })
    }
    const formData = sanitizeFormData(schema)

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE.includes(key)) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(value),
          })
        }
        if (TOBACCO_OPTIONS.includes(key)) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(value),
          })
        }
        if (DRUGS_OPTIONS.includes(key)) {
          const detailsKey =
            `${key}Details` as keyof SubstanceUseHxWidgetSchemaType
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(formData[detailsKey]),
          })
        }
      }
    })

    return result
  }

export { transformIn, transformOut }
