import z from 'zod'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const schema = z.object({
  followUpsId: z.array(z.string()),
})

type VitalWidgetSchemaType = z.infer<typeof schema>

const transformOut =
  (patientId: string, appointmentId: string) =>
  (schema: VitalWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    schema.followUpsId.map((followUpId) => {
      result.push({
        pid: Number(patientId),
        appId: Number(appointmentId),
        sectionName: QuickNoteSectionName.FollowUps,
        sectionItem: `followUpId`,
        sectionItemValue: followUpId,
      })
    })

    return result
  }

const transformIn = (value: QuickNoteSectionItem[]): VitalWidgetSchemaType => {
  const result: VitalWidgetSchemaType = {
    followUpsId: [],
  }

  value?.forEach((item: QuickNoteSectionItem) => {
    if (item.sectionItem === 'followUpId') {
      result.followUpsId.push(item.sectionItemValue)
    }
  })

  return result
}

export { transformIn, transformOut }
