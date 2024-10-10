import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

type HospitalLabsOrdersSchemaType = {
  HospitalLabsOrders: string
}

const transformIn = (
  value: QuickNoteSectionItem[],
): HospitalLabsOrdersSchemaType => {
  const result: HospitalLabsOrdersSchemaType = {
    HospitalLabsOrders: value[0]?.sectionItemValue || '',
  }

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: HospitalLabsOrdersSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (value !== '') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionHospital,
          sectionItem: key,
          sectionItemValue: value?.toString() || '',
        })
      }
    })

    return result
  }

export { transformIn, transformOut }
