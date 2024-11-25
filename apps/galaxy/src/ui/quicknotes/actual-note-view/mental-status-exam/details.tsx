import { MseWidgetSchemaType } from '@/ui/mse/mse-widget/mse-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { renderDataWithOther } from '../utils'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<MseWidgetSchemaType>) => {
  const labelMapping: Record<string, string> = {
    orientation: 'Orientation',
    appearance: 'Appearance',
    behavior: 'Behavior',
    psychomotor: 'Psychomotor',
    thoughtProcess: 'Thought Process',
    memoryHowTested: 'Memory',
    insight: 'Insight',
    judgment: 'Judgment',
    schizophreniaDelusionValues: 'Thought Content Delusion',
    schizophreniaHallucinationsValues: 'Thought Content Hallucinations',
    tcsiYesNo: 'Thought Content Si',
    tchiYesNo: 'Thought Content Hi',
    tcDelusionsYesNo: 'Thought Content Delusions',
    tcHallucinationsYesNo: 'Thought Content Hallucinations',
    mmRecentIntactYesNo: 'Memory Recent Intact',
    mmRemoteIntactYesNo: 'Memory Remote Intact',
    siUnDisclosed: 'Thought Content Si',
    hiUnDisclosed: 'Thought Content Hi',
  }

  return (
    <BlockContainer heading="Mental Status Exam">
      {Object.entries(data).map(([key, value]) => {
        const label = labelMapping[key] || key.replace(/([A-Z])/g, ' $1')

        if (Array.isArray(value) && value.length > 0) {
          return (
            <LabelAndValue
              key={key}
              label={`${label}:`}
              value={renderDataWithOther(key, value, data)}
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
