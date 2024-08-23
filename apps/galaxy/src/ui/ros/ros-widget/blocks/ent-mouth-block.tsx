import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'entMouth'

const BLOCK_TITLE = 'ENT/Mouth'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Hearing changes/Ear pain',
    value: 'hearingChangesEarPain',
  },
  {
    label: 'Sinus congestion',
    value: 'sinusCongestion',
  },
  {
    label: 'Sore throat',
    value: 'soreThroat',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const EntMouthBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { EntMouthBlock }
