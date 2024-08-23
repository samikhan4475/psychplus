import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'psychoanalysis'

const BLOCK_TITLE = 'Psychoanalysis'

const BLOCK_OPTIONS = [
  {
    label: '90845',
    value: '90845',
  },
]

const PsychoanalysisBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { PsychoanalysisBlock }
