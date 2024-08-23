import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'obsession'

const BLOCK_TITLE = 'Obsession'

const BLOCK_OPTIONS = [
  {
    label: 'Contamination',
    value: 'contamination',
  },
  {
    label: 'Doubt',
    value: 'doubt',
  },
  {
    label: 'Somatic',
    value: 'somatic',
  },
  {
    label: 'Aggression',
    value: 'aggression',
  },
  {
    label: 'Sexual',
    value: 'sexual',
  },
  {
    label: 'Compulsion',
    value: 'compulsion',
  },
  {
    label: 'Checking',
    value: 'checking',
  },
  {
    label: 'Washing',
    value: 'washing',
  },
  {
    label: 'Counting',
    value: 'counting',
  },
  {
    label: 'Hoarding',
    value: 'hoarding',
  },
  {
    label: 'Picking',
    value: 'picking',
  },
]

const ObsessionBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { ObsessionBlock }
