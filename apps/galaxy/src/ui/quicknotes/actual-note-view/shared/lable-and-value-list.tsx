import { BlockContainer } from './block-container'
import { LabelAndValue } from './label-and-value'

interface KeyValueDisplayProps {
  data: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  > | null
  heading: string
}

const getValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : ''
  }
  return value ? String(value) : ''
}

const LabelAndValueList = ({ data, heading }: KeyValueDisplayProps) => {
  return (
    <BlockContainer heading={heading}>
      {data &&
        Object.entries(data).map(([key, value]) => (
          <LabelAndValue
            key={key}
            label={`${
              key?.charAt(0)?.toUpperCase() +
              key?.slice(1)?.replace(/([A-Z])/g, ' $1')
            }:`}
            value={getValue(value)}
          />
        ))}
    </BlockContainer>
  )
}

export { LabelAndValueList }
