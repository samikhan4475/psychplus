import { Heading } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'

const BLOCK_ID = 'ectContinuePBlock'
const BLOCK_LABEL = 'Continue ECT'

const BLOCK_OPTIONS = [
  {
    label: 'Series',
    value: 'Series',
  },
  {
    label: 'Maintenance',
    value: 'Maintenance',
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
      <FormFieldError name={BLOCK_ID} />
    </FormFieldContainer>
  )
}

export { ContinueEctBlock }
