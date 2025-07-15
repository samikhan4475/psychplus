import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

type HospitalLabsOrdersSchemaType = {
  HospitalLabsOrders: string
}

const transformIn = (
  value: QuickNoteSectionItem[],
): HospitalLabsOrdersSchemaType => {
  const result: HospitalLabsOrdersSchemaType = {
    HospitalLabsOrders:
      value[0]?.sectionItemValue === '__empty__'
        ? ''
        : value[0]?.sectionItemValue || '',
  }

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: HospitalLabsOrdersSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionHospitalOrders,
        sectionItem: key,
        sectionItemValue: value?.toString() || '__empty__',
      })
    })

    return result
  }

export { transformIn, transformOut }
