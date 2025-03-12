import { getInitialValues } from './utils'
import { PastPsychHxSchemaType } from './past-psych-hx-schema'
import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'

const transformIn = (
  value: NoteSectionItem[],
): PastPsychHxSchemaType => {
  const result: Record<string, number | string | undefined | boolean> =
    getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue
    if (['psychHospitalizations', 'suicideAttempts'].includes(key)) {
      result[key] = itemValue
      // This field is used to toggle widget data on actual noteview
    } else if (key === 'widgetContainerCheckboxField') {
      result[key] = itemValue
    } else if (key === 'other') {
      result.other = true
      result.otherDetails = itemValue === 'empty' ? '' : itemValue
    } else if (key in result) {
      result[`${key}Age`] =
        itemValue !== 'empty' ? Number(itemValue) : undefined
      result[key] = true
    }
  })

  return result as PastPsychHxSchemaType
}

const transformOut =
  (patientId: string) =>
    (schema: PastPsychHxSchemaType): NoteSectionItem[] => {
      const result: NoteSectionItem[] = []

      const QuickNotesPayload = {
        pid: Number(patientId),
        sectionName: NoteSectionName.NoteSectionPastPsychHx,
      }

      const formData = sanitizeFormData(schema)

      Object.entries(formData).forEach(([key, value]) => {
        if (['psychHospitalizations', 'suicideAttempts'].includes(key)) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: value.toString(),
          })
        } else if (key === 'other' && value === true) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: formData.otherDetails ?? 'empty',
          })
        } else if (
          !key.includes('Age') &&
          value &&
          key !== 'otherDetails' &&
          key !== 'widgetContainerCheckboxField'
        ) {
          const ageKey = `${key}Age` as keyof PastPsychHxSchemaType
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue:
              formData[ageKey] === '' || formData[ageKey] === undefined
                ? 'empty'
                : formData[ageKey].toString(),
          })
        }
      })

      if (result.length === 0) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: 'empty',
          sectionItemValue: 'true',
        })
      }

      return result
    }

export { transformIn, transformOut }
