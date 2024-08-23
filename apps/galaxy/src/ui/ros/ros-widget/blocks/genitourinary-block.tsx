import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'genitourinary'

const BLOCK_TITLE = 'Genitourinary'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Dysmenorrhea',
    value: 'dysmenorrhea',
  },
  {
    label: 'Urinary frequency',
    value: 'urinaryFrequency',
  },
  {
    label: 'Urinary incontinence',
    value: 'urinaryIncontinence',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const GenitourinaryBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { GenitourinaryBlock }
