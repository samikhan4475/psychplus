import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'orientation'

const BLOCK_TITLE = 'Orientation'

const BLOCK_OPTIONS = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Place',
    value: 'place',
  },
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Time',
    value: 'time',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const OrientationBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { OrientationBlock }
