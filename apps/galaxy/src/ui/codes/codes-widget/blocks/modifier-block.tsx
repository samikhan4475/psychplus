import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'modifier'

const BLOCK_TITLE = 'Modifier'

const BLOCK_OPTIONS = [
  {
    label: '25',
    value: '25',
  },
  {
    label: '59',
    value: '59',
  },
  {
    label: '95',
    value: '95',
  },
]

const ModifierBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ModifierBlock }
