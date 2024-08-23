import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'tobaccoCessation'

const BLOCK_TITLE = 'Tobacco Cessation'

const BLOCK_OPTIONS = [
  {
    label: '99406',
    value: '99406',
  },
  {
    label: '99407',
    value: '99407',
  },
]

const TobaccoCessationBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { TobaccoCessationBlock }
