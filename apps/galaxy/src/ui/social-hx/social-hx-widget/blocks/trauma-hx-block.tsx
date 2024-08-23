import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'traumaHx'

const BLOCK_TITLE = 'Trauma Hx'

const BLOCK_OPTIONS = [
  {
    label: 'Physical',
    value: 'physical',
  },
  {
    label: 'Emotional',
    value: 'emotional',
  },
  {
    label: 'Sexual',
    value: 'sexual',
  },
]

const TraumaHxBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { TraumaHxBlock }
