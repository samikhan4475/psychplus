import { HospitalInitialFieldMapping } from '@/ui/hospital/hospital-initial-widget/constants'
import { HospitalInitialWidgetSchemaType } from '@/ui/hospital/hospital-initial-widget/hospital-initial-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { sortByMapping } from './utils'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<HospitalInitialWidgetSchemaType>) => {
  const renderDataWithOther = (key: string, values: string[]) => {
    if (!values || values.length === 0) return null
    let prefix = ''
    const formattedValues: string[] = []
    let otherDetail = ''

    values.forEach((value) => {
      const cleanedValue = HospitalInitialFieldMapping.find(
        (item) => item.value === value,
      )?.label

      prefix = value.split('_')[0]

      const otherDetailKey = `${prefix}OtherDetails` as keyof typeof data
      const otherDetailText = data[otherDetailKey] as string

      if (cleanedValue === 'Other' && otherDetailText) {
        otherDetail = `Other: ${otherDetailText}`
      } else {
        formattedValues.push(cleanedValue ?? '')
      }
    })

    if (otherDetail) {
      formattedValues.push(otherDetail)
    }

    const sortedValues = sortByMapping(prefix, formattedValues)

    return sortedValues.join(', ')
  }

  return (
    <BlockContainer heading="Hospital Initial">
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          const label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())

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
