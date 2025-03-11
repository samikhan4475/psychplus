import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { SocialHxSchemaType } from './social-hx-schema'
import { getInitialValues } from './utils'

const transformIn = (value: NoteSectionItem[]): SocialHxSchemaType => {
  const result: Record<string, string | boolean | string[]> = getInitialValues()

  value.forEach((item) => {
    const key = item.sectionItem as keyof SocialHxSchemaType
    if (key === 'traumaHx') {
      result[key] =
        typeof item?.sectionItemValue === 'string'
          ? item?.sectionItemValue?.split(',')?.map((v) => v.trim())
          : []
    } else {
      result[key] = item.sectionItemValue
    }
  })
  return result as SocialHxSchemaType
}

const transformOut =
  (patientId: string) =>
    (schema: SocialHxSchemaType): NoteSectionItem[] => {
      const result: NoteSectionItem[] = []

      const defaultPayload = {
        pid: Number(patientId),
        sectionName: NoteSectionName.NoteSectionSocialHx,
      }
      const formData = sanitizeFormData(schema)

      Object.entries(formData).forEach(([key, value]) => {
        result.push({
          ...defaultPayload,
          sectionItem: key,
          sectionItemValue: Array.isArray(value)
            ? value?.join(',')
            : String(value),
        })
      })

      if (!result.length) {
        result.push({
          ...defaultPayload,
          sectionItem: 'empty',
          sectionItemValue: 'true',
        })
      }
      return result
    }

export { transformIn, transformOut }
