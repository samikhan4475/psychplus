import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { TherapySchemaType } from './therapy-schema'

const transformOut =
  (patientId: string) =>
  (schema: TherapySchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const data = sanitizeFormData(schema)

    Object.entries(data).forEach(([key, value]) => {
      const sectionItemValue =
        typeof value === 'object' && value !== null
          ? JSON.stringify(value)
          : (value as string)

      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionTherapy,
        sectionItem: key,
        sectionItemValue,
      })
    })

    return result
  }

const transformIn = (value: QuickNoteSectionItem[]): TherapySchemaType => {
  const result: TherapySchemaType = {
    therapyTimeSpent: 'timeRangeOne',
    therapySessionParticipants: 'Patients',
    patientOther: '',
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail: '',
  }

  value.forEach((item) => {
    const key = item.sectionItem as keyof TherapySchemaType

    if (
      key === 'therapyDetailsModality' ||
      key === 'therapyDetailsInterventions'
    ) {
      result[key] = (() => {
        try {
          return JSON.parse(item.sectionItemValue) as {
            value: string
            display: string
          }[]
        } catch (error) {
          console.warn(`Could not parse ${key}:`, item.sectionItemValue)
          return []
        }
      })()
    } else if (key === 'therapyTimeSpent') {
      result[key] = item.sectionItemValue as
        | 'timeRangeOne'
        | 'timeRangeTwo'
        | 'timeRangeThree'
    } else {
      result[key] = item.sectionItemValue
    }
  })

  return result
}

export { transformOut, transformIn }
