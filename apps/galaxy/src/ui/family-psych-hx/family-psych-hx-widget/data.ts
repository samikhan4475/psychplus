import { WidgetContainerCheckboxField } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { FamilyPsychHxWidgetSchemaType } from './family-psych-hx-widget-schema'
import { getInitialValues } from './utils'

const transformIn = (
  value: QuickNoteSectionItem[],
): FamilyPsychHxWidgetSchemaType => {
  const result: Record<string, string | boolean | string[]> = getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem as keyof FamilyPsychHxWidgetSchemaType
    const relationKey =
      `${item.sectionItem}Relation` as keyof FamilyPsychHxWidgetSchemaType
    const itemValue =
      item.sectionItemValue === 'empty' ? [] : item.sectionItemValue.split(',')

    if (key === 'other') {
      result.other = item.sectionItemValue
    } else if (key === 'widgetContainerCheckboxField') {
      result.widgetContainerCheckboxField = item.sectionItemValue
    } else if (key in result) {
      result[relationKey] = itemValue
      result[key] = true
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: FamilyPsychHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const defaultPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    }
    const formData = sanitizeFormData(schema)

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'other') {
        result.push({
          ...defaultPayload,
          sectionItem: key,
          sectionItemValue: value.toString(),
        })
      } else if (
        !key.includes('Relation') &&
        value &&
        key !== 'widgetContainerCheckboxField'
      ) {
        const relationKey =
          `${key}Relation` as keyof FamilyPsychHxWidgetSchemaType
        result.push({
          ...defaultPayload,
          sectionItem: key,
          sectionItemValue:
            formData[relationKey] === '' || formData[relationKey] === undefined
              ? 'empty'
              : formData[relationKey].toString(),
        })
      }
    })
    if (formData.widgetContainerCheckboxField) {
      result.push({
        ...defaultPayload,
        sectionItem: WidgetContainerCheckboxField,
        sectionItemValue: formData.widgetContainerCheckboxField,
      })
    }
    if (result.length === 0) {
      result.push({
        ...defaultPayload,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }
    return result
  }

export { transformIn, transformOut }
