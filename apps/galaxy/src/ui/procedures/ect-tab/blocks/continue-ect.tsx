import { FormFieldContainer, FormFieldLabel, RadioSelectSection } from '@/components'
import { Heading } from '@radix-ui/themes'

const BLOCK_ID = 'ectContinuePBlock'
const BLOCK_LABEL = 'Continue ECT'


const BLOCK_OPTIONS = [
  {
    label: 'Series',
    value: 'series',
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
  },
]

const ContinueEctBlock = () => {
  return (
    <FormFieldContainer className="w-auto flex flex-col mt-2">
      <Heading size="3" align="left"> Plan</Heading>
      <RadioSelectSection
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        required={true}
      />
    </FormFieldContainer>

  )
}

export { ContinueEctBlock }
