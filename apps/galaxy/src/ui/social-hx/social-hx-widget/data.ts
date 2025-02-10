import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { SocialHxWidgetSchemaType } from './social-hx-widget-schema'
import { getInitialValues } from './utils'

const transformOut =
  (patientId: string) =>
  (schema: SocialHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionSocialHx,
        sectionItem: key,
        sectionItemValue: Array.isArray(value)
          ? value?.join(', ')
          : String(value),
      })
    })

    if (!result.length) {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionSocialHx,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }
    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): SocialHxWidgetSchemaType => {
  const result: Record<string, string | string[]> = getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem as keyof SocialHxWidgetSchemaType
    if (key === 'traumaHx') {
      result[key] =
        typeof item?.sectionItemValue === 'string'
          ? item?.sectionItemValue?.split(',')?.map((v) => v.trim())
          : []
    } else {
      result[key] = item.sectionItemValue
    }
  })
  return result as SocialHxWidgetSchemaType
}

export { transformIn, transformOut }
