import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<{ HospitalLabsOrders: string }>) => {
  return (
    <BlockContainer heading="Hospital Orders">
      <LabelAndValue label="Hospital Orders" value={data.HospitalLabsOrders} />
    </BlockContainer>
  )
}

export { Details }
