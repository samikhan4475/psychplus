import { BlockContainer, LabelAndValue } from './shared'

const PastMedicalHx = () => {
  return (
    <BlockContainer heading="Past Medical Hx">
      <LabelAndValue label="Pregnant:" value="Date of Conception: 03/12/24" />
      <LabelAndValue label="Breast Feeding:" value="Days Post Partum: 12" />
    </BlockContainer>
  )
}

export { PastMedicalHx }
