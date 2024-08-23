import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'therapy'

const BLOCK_TITLE = 'Therapy'

const BLOCK_OPTIONS = [
  {
    label: '90833',
    value: '90833',
  },
  {
    label: '90836',
    value: '90836',
  },
  {
    label: '90838',
    value: '90838',
  },
]

const TherapyBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { TherapyBlock }
