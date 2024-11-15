import { QuickNoteSectionItem } from '@/types'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<QuickNoteSectionItem[]>) => {
  return (
    <BlockContainer heading="Codes">
      {data.map((code) => (
        <LabelAndValue key={code.id} label="Primary Code :" value={code.sectionItemValue} />
      ))}
    </BlockContainer>
  )
}

export { Details }
