import { FormFieldError, RadioSelectSection } from '@/components'

const BLOCK_ID = 'ectTypeBlock'
const BLOCK_LABEL = 'ECT Type'

const BLOCK_OPTIONS = [
  {
    label: 'Bilateral',
    value: 'Bilateral',
  },
  {
    label: 'Standard RUL',
    value: 'Standard RUL',
  },
  {
    label: 'Ultra-brief RUL',
    value: 'Ultra-brief RUL',
  },
]

const EctTypeBlock = () => {
  return (
    <>
      <RadioSelectSection
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        required={true}
      />
      <FormFieldError name={BLOCK_ID} />
    </>
  )
}

export { EctTypeBlock }
