import { Text } from '@radix-ui/themes'
import { getSlashedPaddedDateString } from '@/utils'
import { BlockContainer } from '../shared'

interface Allergy {
  allergyName: string
  allergyType: string
  reaction: string
  severityCode: string
  onsetBegan: string
  onsetEnded: string
}

interface Props {
  data: Allergy[]
}

const formatAllergyDetails = (allergy: Allergy) => {
  const {
    allergyName,
    allergyType,
    reaction,
    severityCode,
    onsetBegan,
    onsetEnded,
  } = allergy
  return `${allergyName} | ${allergyType} | ${reaction} | ${severityCode} | Active | ${getSlashedPaddedDateString(
    onsetBegan,
  )} | ${getSlashedPaddedDateString(onsetEnded)}`
}

const Details = ({ data }: Props) => {
  return (
    <BlockContainer heading="Allergies">
      {data.map((allergy) => (
        <Text size="1" key={allergy.allergyName}>
          {formatAllergyDetails(allergy)}
        </Text>
      ))}
    </BlockContainer>
  )
}

export { Details }
