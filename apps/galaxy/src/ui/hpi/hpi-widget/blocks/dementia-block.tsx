import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'mania'

const BLOCK_TITLE = 'Mania'

const BLOCK_OPTIONS = [
  {
    label: 'Memory Loss',
    value: 'memoryLoss',
  },
  {
    label: 'Confusion',
    value: 'confusion',
  },
  {
    label: 'Difficulty with ADLs',
    value: 'difficultyWithAdls',
  },
  {
    label: 'Wandering',
    value: 'wandering',
  },
  {
    label: 'Agitation',
    value: 'agitation',
  },
  {
    label: 'AH',
    value: 'ah',
  },
  {
    label: 'VH',
    value: 'vh',
  },
  {
    label: 'Parkinson Symptoms',
    value: 'parkinsonSymptoms',
  },
]

const DementiaBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { DementiaBlock }
