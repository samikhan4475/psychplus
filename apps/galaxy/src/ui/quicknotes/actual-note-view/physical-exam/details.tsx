import { PhysicalExamWidgetSchemaType } from '@/ui/physical-exam/physical-exam-widget/physical-exam-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<PhysicalExamWidgetSchemaType>) => {
  const formatValue = (value: string) => {
    return value?.replace(/^[a-z]+/, '')
  }

  const renderDataWithOther = (key: string, values: string[]) => {
    if (!values || values.length === 0) return null

    const formattedValues: string[] = []
    let otherDetail = ''

    values.forEach((value) => {
      const cleanedValue = formatValue(value)

      const [, prefix] = value?.match(/^([a-z]+)([A-Z].*)$/) || []

      if (prefix) {
        const otherDetailKey = `${prefix}OtherDetails` as keyof typeof data
        const otherDetailText = data[otherDetailKey] as string

        if (cleanedValue === 'Other' && otherDetailText) {
          otherDetail = `Other: ${otherDetailText}`
        } else {
          formattedValues.push(cleanedValue)
        }
      }
    })

    if (otherDetail) {
      formattedValues.push(otherDetail)
    }

    return formattedValues.join(', ')
  }

  return (
    <BlockContainer heading="Physical Exam">
      {Object.entries(data).map(([key, value]) => {
        let label = ''

        switch (key) {
          case 'general':
            label = 'General'
            break
          case 'skin':
            label = 'Skin'
            break
          case 'heent':
            label = 'HEENT'
            break
          case 'neck':
            label = 'Neck'
            break
          case 'lymphNodes':
            label = 'Lymph Nodes'
            break
          case 'chest':
            label = 'Chest'
            break
          case 'cardiovascularCvs':
            label = 'Cardiovascular (CVS)'
            break
          case 'lungs':
            label = 'Lungs'
            break
          case 'gastrointestinalGi':
            label = 'Gastrointestinal (GI)'
            break
          case 'adhdHyperactive':
            label = 'ADHD/Hyperactive'
            break
          case 'gynecologicalGyn':
            label = 'Gynecological (Gyn)'
            break
          case 'genitourinaryGu':
            label = 'Genitourinary (GU)'
            break
          case 'centralNervousSystemCns':
            label = 'Central Nervous System (CNS)'
            break
          case 'musculoskeletal':
            label = 'Musculoskeletal'
            break
          case 'nutrition':
            label = 'Nutrition'
            break
          case 'psychiatric':
            label = 'Psychiatric'
            break
          case 'cranialNervesExam':
            label = 'Neurological Examination of Cranial Nerves'
            break
          default:
            label = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())
        }

        if (Array.isArray(value) && value.length > 0) {
          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={renderDataWithOther(key, value)}
            />
          )
        }

        return null
      })}
    </BlockContainer>
  )
}

export { Details }
