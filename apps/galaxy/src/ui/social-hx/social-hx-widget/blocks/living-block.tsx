import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'living'

const BLOCK_TITLE = 'Living'

const BLOCK_OPTIONS = [
  {
    label: 'Alone',
    value: 'alone',
  },
  {
    label: 'With Family',
    value: 'withFamily',
  },
  {
    label: 'Homeless',
    value: 'homeless',
  },
]

const LivingBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { LivingBlock }
