import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'ectType'
const BLOCK_LABEL = 'ECT Type'

const BLOCK_OPTIONS = [
  {
    label: 'Bilatera',
    value: 'bilatera',
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
    <RadioSelectSection
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      label={BLOCK_LABEL}
      required={true}
    />
  )
}

export { EctTypeBlock }
