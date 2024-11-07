import z from 'zod'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '../quicknotes/constants'

const schema = z.object({
  vitalsId: z.array(z.string()),
})

type VitalWidgetSchemaType = z.infer<typeof schema>

const transformOut =
  (patientId: string, appointmentId: string) =>
  (schema: VitalWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    schema.vitalsId.map((vitalId) => {
      result.push({
        pid: Number(patientId),
        appId: Number(appointmentId),
        sectionName: QuickNoteSectionName.Vitals,
        sectionItem: `vitalId`,
        sectionItemValue: vitalId,
      })
    })

    return result
  }

const transformIn = (value: QuickNoteSectionItem[]): VitalWidgetSchemaType => {
  const result: VitalWidgetSchemaType = {
    vitalsId: [],
  }

  value?.forEach((item: QuickNoteSectionItem) => {
    if (item.sectionItem === 'vitalId') {
      result.vitalsId.push(item.sectionItemValue)
    }
  })

  return result
}

export { transformIn, transformOut }
