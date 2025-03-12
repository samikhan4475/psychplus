import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { SubstanceUseSchemaType } from './substance-use-hx-schema'
import { getInitialValues } from './utils'
const TOBACCO_OPTIONS = [
  'tobaccoChewSmoke',
  'smokePacks',
]

const DRUGS_OPTIONS = [
  'inhalants',
  'pcp',
  'amphetamine',
  'cocaine',
  'sedative',
  'opioids',
]

const TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE = [
  'tobacco',
  'drugs',
  'alcohol',
]
const transformIn = (
  list: NoteSectionItem[],
): SubstanceUseSchemaType => {
  const result: Record<
    string,
    number | string | undefined | boolean | string[] | null
  > = getInitialValues()

  const value = list.filter(
    (item) =>
      item.sectionName === NoteSectionName.NoteSectionSubstanceUseHx,
  )

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (key === 'referralTreatment') {
      const list = itemValue.split(',')
      result[key] = list || []
    } else if (key === 'briefInterventionDetail') {
      result[key] = itemValue
    } else if (key === 'widgetContainerCheckboxField') {
      result[key] = itemValue
    } else if (TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE.includes(key)) {
      result[key] = itemValue
    } else if (TOBACCO_OPTIONS.includes(key)) {
      result[key] = itemValue
    } else if (DRUGS_OPTIONS.includes(key)) {
      const detailKey = `${key}Details`
      result[detailKey] = itemValue === 'undefined' ? '' : itemValue
      result[key] = true
    } else {
      result[key] = itemValue === 'true'
    }
  })

  return result as SubstanceUseSchemaType
}

const transformOut =
  (
    patientId: string,
  ) =>
    async (
      schema: Record<string, undefined>,
    ) => {
      const result = []

      const QuickNotesPayload = {
        pid: Number(patientId),
        sectionName: NoteSectionName.NoteSectionSubstanceUseHx,
      }

      if (schema.alcohol === 'no' && schema.drugs === 'no') {
        schema['briefInterventionDetail'] = undefined
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
              `${key}Details` as keyof SubstanceUseSchemaType
            result.push({
              ...QuickNotesPayload,
              sectionItem: key,
              sectionItemValue: String(formData[detailsKey]),
            })
          }

        }
      })

      if (!result.length) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: 'empty',
          sectionItemValue: 'true',
        })
      }
      return [...result]
    }

export { transformIn, transformOut }
