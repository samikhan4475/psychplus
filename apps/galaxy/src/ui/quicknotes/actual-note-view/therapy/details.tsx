import { BlockContainer, LabelAndValue } from '../shared'

interface DetailsProps {
  paragraphHeading: string
  paragraph: string
}

const Details = ({ paragraphHeading, paragraph }: DetailsProps) => {
  return (
    <BlockContainer heading={paragraphHeading}>
      <LabelAndValue value={paragraph} />
    </BlockContainer>
  )
}

export { Details }
