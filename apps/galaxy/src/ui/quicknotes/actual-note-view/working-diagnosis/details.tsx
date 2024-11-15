import { Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<QuickNoteSectionItem[]>) => {
  return (
    <BlockContainer heading="Working Diagnosis">
      {data.map((diagnosis) => (
        <Text key={diagnosis.id} size="1">
          {diagnosis.sectionItemValue}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
