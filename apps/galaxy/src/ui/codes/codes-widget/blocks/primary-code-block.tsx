import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'primaryCode'

const BLOCK_TITLE = 'Primary Code'

const BLOCK_OPTIONS = [
  {
    label: '99202',
    value: '99202',
  },
  {
    label: '99203',
    value: '99203',
  },
  {
    label: '99204',
    value: '99204',
  },
  {
    label: '99205',
    value: '99205',
  },
]

const PrimaryCodeBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { PrimaryCodeBlock }
