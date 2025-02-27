import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { FamilyPsychHxSchemaType } from './family-psych-hx-schema'
import { getInitialValues } from './utils'

const transformIn = (value: NoteSectionItem[]): FamilyPsychHxSchemaType => {
  const result: Record<string, string | boolean | string[]> = getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem as keyof FamilyPsychHxSchemaType
    const relationKey =
      `${item.sectionItem}Relation` as keyof FamilyPsychHxSchemaType
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
  (schema: FamilyPsychHxSchemaType): NoteSectionItem[] => {
    const result: NoteSectionItem[] = []

    const defaultPayload = {
      pid: Number(patientId),
      sectionName: NoteSectionName.NoteSectionFamilyPsychHx,
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
        const relationKey = `${key}Relation` as keyof FamilyPsychHxSchemaType
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
        sectionItem: 'widgetContainerCheckboxField',
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
