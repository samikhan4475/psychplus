import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'interactiveComplexity'

const BLOCK_TITLE = 'Interactive Complexity'

const BLOCK_OPTIONS = [
  {
    label: '90785',
    value: '90785',
  },
]

const InteractiveComplexityBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { InteractiveComplexityBlock }
