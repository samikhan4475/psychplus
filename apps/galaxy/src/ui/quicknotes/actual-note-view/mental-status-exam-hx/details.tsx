import { MseWidgetSchemaType } from '@/ui/mse/mse-widget/mse-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<MseWidgetSchemaType>) => {
  const formatValue = (value: string) => {
    return value.replace(/^[a-z]+/, '')
  }

  const renderDataWithOther = (key: string, values: string[]) => {
    if (!values || values.length === 0) return null

    const formattedValues = []
    let otherDetail = ''

    values.forEach((value) => {
      const cleanedValue = formatValue(value)
      const [, prefix] = value.match(/^([a-z]+)([A-Z].*)$/) || []

      const dataRecord = data as Record<string, string | string[]>
      const otherDetailText = dataRecord[`${prefix}OtherDetails`]

      if (cleanedValue === 'Other' && otherDetailText) {
        otherDetail = `Other: ${otherDetailText}`
      } else {
        formattedValues.push(cleanedValue)
      }
    })

    if (otherDetail) {
      formattedValues.push(otherDetail)
    }

    return formattedValues.join(', ')
  }

  return (
    <BlockContainer heading="Mental Status Exam">
      {Object.entries(data).map(([key, value]) => {
        let label = ''

        switch (key) {
          case 'orientation':
            label = 'Orientation'
            break
          case 'appearance':
            label = 'Appearance'
            break
          case 'behavior':
            label = 'Behavior'
            break
          case 'psychomotor':
            label = 'Psychomotor'
            break
          case 'thoughtProcess':
            label = 'Thought Process'
            break
          case 'memoryHowTested':
            label = 'Memory'
            break
          case 'insight':
            label = 'Insight'
            break
          case 'judgment':
            label = 'Judgment'
            break
          case 'schizophreniaDelusionValues':
            label = 'Thought Content Delusion'
            break
          case 'schizophreniaHallucinationsValues':
            label = 'Thought Content Hallucinations'
            break
          case 'tcsiYesNo':
            label = 'Thought Content Si'
            break
          case 'tchiYesNo':
            label = 'Thought Content Hi'
            break
          case 'tcDelusionsYesNo':
            label = 'Thought Content Delusions'
            break
          case 'tcHallucinationsYesNo':
            label = 'Thought Content Hallucinations'
            break
          case 'mmRecentIntactYesNo':
            label = 'Memory Recent Intact'
            break
          case 'mmRemoteIntactYesNo':
            label = 'Memory Remote Intact'
            break
          default:
            label = key.replace(/([A-Z])/g, ' $1')
        }

        if (Array.isArray(value) && value.length > 0) {
          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={renderDataWithOther(key, value)}
            />
          )
        } else if (
          typeof value === 'string' &&
          (value === 'yes' || value === 'no')
        ) {
          return <LabelAndValue key={key} label={`${label}:`} value={value} />
        }

        return null
      })}
    </BlockContainer>
  )
}

export { Details }
