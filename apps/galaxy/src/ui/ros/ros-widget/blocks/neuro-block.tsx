import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'neuro'

const BLOCK_TITLE = 'Neuro'

const NEURO_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'neuNoConcerns',
  },
  {
    label: 'Weakness',
    value: 'neuWeakness',
  },
  {
    label: 'Paresthesia',
    value: 'neuParesthesia',
  },
  {
    label: 'Dizziness',
    value: 'neuDizziness',
  },
  {
    label: 'Headache',
    value: 'neuHeadache',
  },
  {
    label: 'Recent falls',
    value: 'neuRecentFalls',
  },
  {
    label: 'Other',
    value: 'neuOther',
    details: {
      type: 'text',
      label: '',
      field: 'neuOtherDetails',
    },
  },
]

const NeuroBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'neuNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={NEURO_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { NeuroBlock, NEURO_BLOCK_OPTIONS }
