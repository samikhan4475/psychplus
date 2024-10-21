import { Text } from '@radix-ui/themes'
import { FormFieldContainer, YesNoSelect } from '@/components'

const BLOCK_ID = 'suicide'

const SuicideBlock = () => {
  return (
    <FormFieldContainer>
      <Text size="1" weight="medium">
        Did the patient experience any suicidal ideations during treatment or
        since the last treatment session?
      </Text>
      <YesNoSelect field={BLOCK_ID} />
    </FormFieldContainer>
  )
}

export default SuicideBlock
