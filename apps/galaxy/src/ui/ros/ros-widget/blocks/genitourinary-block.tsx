import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'genitourinary'

const BLOCK_TITLE = 'Genitourinary'

const GENITOURINARY_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'guNoConcerns',
  },
  {
    label: 'Dysmenorrhea',
    value: 'guDysmenorrhea',
  },
  {
    label: 'Urinary frequency',
    value: 'guUrinaryFrequency',
  },
  {
    label: 'Urinary incontinence',
    value: 'guUrinaryIncontinence',
  },
  {
    label: 'Other',
    value: 'guOther',
    details: {
      type: 'text',
      label: '',
      field: 'guOtherDetails',
    },
  },
]

const GenitourinaryBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'guNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={GENITOURINARY_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { GenitourinaryBlock, GENITOURINARY_BLOCK_OPTIONS }
