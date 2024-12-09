import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'

const BLOCK_ID = 'procurementMethod'

const BLOCK_TITLE = 'Select Method'

const BLOCK_OPTIONS = [
  {
    label: 'Buy & Bill',
    value: 'Buy & Bill',
  },
  {
    label: 'Only Bill',
    value: 'Only Bill',
  },
]
const PrecurementBlock = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <RadioSelectSection
        label={BLOCK_TITLE}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        required
      />
      <FormFieldError name={BLOCK_ID} />
    </FormFieldContainer>
  )
}

export { PrecurementBlock }
