import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'thoughtProcess'

const BLOCK_TITLE = 'Thought Process'

const BLOCK_OPTIONS = [
  {
    label: 'Linear',
    value: 'linear',
  },
  {
    label: 'Loose',
    value: 'loose',
  },
  {
    label: 'Circumstantial',
    value: 'circumstantial',
  },
  {
    label: 'Tangential',
    value: 'tangential',
  },
  {
    label: 'Flight of ideas',
    value: 'flightOfIdeas',
  },
  {
    label: 'Disorganized',
    value: 'disorganized',
  },
  {
    label: 'Concrete',
    value: 'concrete',
  },
  {
    label: 'Blocking',
    value: 'blocking',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const ThoughtProcessBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ThoughtProcessBlock }
