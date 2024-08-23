import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'speech'

const BLOCK_TITLE = 'Speech'

const BLOCK_OPTIONS = [
  {
    label: 'Regular rate/rhythm',
    value: 'regularRateRhythm',
  },
  {
    label: 'Rapid',
    value: 'rapid',
  },
  {
    label: 'Pressured',
    value: 'pressured',
  },
  {
    label: 'Slow',
    value: 'slow',
  },
  {
    label: 'Soft',
    value: 'soft',
  },
  {
    label: 'Loud',
    value: 'loud',
  },
  {
    label: 'Muffled',
    value: 'muffled',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const SpeechBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { SpeechBlock }
