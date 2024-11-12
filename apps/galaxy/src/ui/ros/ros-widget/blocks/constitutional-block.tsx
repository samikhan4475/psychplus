import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'constitutional'
const BLOCK_TITLE = 'Constitutional'

const CONSTITUTIONAL_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'No concerns', value: 'ctNoConcerns' },
  { label: 'Weight change', value: 'ctWeightChange' },
  { label: 'Fever', value: 'ctFever' },
  { label: 'Chills', value: 'ctChills' },
  { label: 'Fatigue', value: 'ctFatigue' },
  {
    label: 'Other',
    value: 'ctOther',
    details: { type: 'text', label: '', field: 'ctOtherDetails' },
  },
]

const ConstitutionalBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'ctNoConcerns',
  })

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={CONSTITUTIONAL_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { ConstitutionalBlock, CONSTITUTIONAL_BLOCK_OPTIONS }
