import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'traumaHx'

const BLOCK_TITLE = 'Trauma Hx'

const TRAUMA_HX_BLOCK_OPTIONS = [
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
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={TRAUMA_HX_BLOCK_OPTIONS}
    />
  )
}

export { TraumaHxBlock, TRAUMA_HX_BLOCK_OPTIONS }
