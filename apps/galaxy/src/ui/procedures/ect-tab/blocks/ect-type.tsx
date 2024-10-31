import { FormFieldError, RadioSelectSection } from '@/components'

const BLOCK_ID = 'ectTypeBlock'
const BLOCK_LABEL = 'ECT Type'

const BLOCK_OPTIONS = [
  {
    label: 'Bilateral',
    value: 'bilateral',
  },
  {
    label: 'Standard RUL',
    value: 'standardRul',
  },
  {
    label: 'Ultra-brief RUL',
    value: 'ultraBriefRUL',
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
