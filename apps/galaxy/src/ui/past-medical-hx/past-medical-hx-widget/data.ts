import { WidgetContainerCheckboxField } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { PastMedicalHxWidgetSchemaType } from './past-medical-hx-widget-schema'
import { getInitialValues } from './utils'

const transformIn = (
  value: QuickNoteSectionItem[],
): PastMedicalHxWidgetSchemaType => {
  const result: Record<string, number | string | undefined | boolean | Date> =
    getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (key === 'other') {
      result.other = itemValue !== 'undefined' && itemValue !== undefined
    }

    if (key === 'otherDetails') {
      result.otherDetails =
        itemValue !== 'undefined' && itemValue !== undefined
          ? itemValue
          : undefined
    }
    if (key === 'widgetContainerCheckboxField') {
      result.widgetContainerCheckboxField = itemValue
    } else if (key === 'pregnantDate') {
      result.pregnantDate =
        itemValue !== 'undefined' && itemValue !== undefined
          ? itemValue
          : undefined
    } else if (key === 'breastFeedingDaysPostPartum') {
      result.breastFeedingDaysPostPartum =
        itemValue !== 'undefined' && itemValue !== undefined
          ? Number(itemValue)
          : undefined
    } else if (key in result && key !== 'otherDetails') {
      result[key] = itemValue === 'true'
    }
  })

  return result as PastMedicalHxWidgetSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: PastMedicalHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    }

    const formData = sanitizeFormData(schema)
    const addQuickNote = (sectionItem: string, sectionItemValue: string) => {
      result.push({ ...QuickNotesPayload, sectionItem, sectionItemValue })
    }

    Object.entries(formData).forEach(([key, value]) => {
      const isTrueOrFalse = value ? 'true' : 'false'

      switch (key) {
        case 'other':
          addQuickNote(key, isTrueOrFalse)
          addQuickNote(
            'otherDetails',
            value && formData.otherDetails ? formData.otherDetails : '',
          )
          break

        case WidgetContainerCheckboxField:
          if (formData.widgetContainerCheckboxField) {
            addQuickNote(
              WidgetContainerCheckboxField,
              formData.widgetContainerCheckboxField,
            )
          }
          break
        case 'pregnant':
          if (value && formData.pregnantDate) {
            addQuickNote('pregnantDate', formData.pregnantDate.toString())
          }
          addQuickNote(key, isTrueOrFalse)
          break

        case 'breastFeeding':
          if (value && formData.breastFeedingDaysPostPartum) {
            addQuickNote(
              'breastFeedingDaysPostPartum',
              formData.breastFeedingDaysPostPartum.toString(),
            )
          }
          addQuickNote(key, isTrueOrFalse)
          break

        case 'pregnantDate':
        case 'breastFeedingDaysPostPartum':
        case 'otherDetails':
          break
        default:
          addQuickNote(key, isTrueOrFalse)
          break
      }
    })

    if (!result.length) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }

    return result
  }

export { transformIn, transformOut }
