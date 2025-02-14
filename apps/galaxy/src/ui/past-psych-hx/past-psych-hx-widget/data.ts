import { WidgetContainerCheckboxField } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { PastPsychHxWidgetSchemaType } from './past-psych-hx-widget-schema'
import { getInitialValues } from './utils'

const transformIn = (
  value: QuickNoteSectionItem[],
): PastPsychHxWidgetSchemaType => {
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

  return result as PastPsychHxWidgetSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: PastPsychHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
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
        const ageKey = `${key}Age` as keyof PastPsychHxWidgetSchemaType
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
    if (formData.widgetContainerCheckboxField) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: WidgetContainerCheckboxField,
        sectionItemValue: formData.widgetContainerCheckboxField,
      })
    }
    return result
  }

export { transformIn, transformOut }
