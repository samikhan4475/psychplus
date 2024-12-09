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
        sectionItemValue: value,
      })
    })

    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): SocialHxWidgetSchemaType => {
  const result: Record<string, string> = getInitialValues()

  value.forEach((item) => {
    result[item.sectionItem as keyof SocialHxWidgetSchemaType] =
      item.sectionItemValue
  })

  return result as SocialHxWidgetSchemaType
}

export { transformIn, transformOut }
