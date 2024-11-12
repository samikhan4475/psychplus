import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'cardiovascular'

const BLOCK_TITLE = 'Cardiovascular'

const CARDIOVASCULAR_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'cvsNoConcerns',
  },
  {
    label: 'Chest pain',
    value: 'cvsChestPain',
  },
  {
    label: 'Shortness of breath',
    value: 'cvsShortnessOfBreath',
  },
  {
    label: 'Palpitations',
    value: 'cvsPalpitations',
  },
  {
    label: 'Other',
    value: 'cvsOther',
    details: {
      type: 'text',
      label: '',
      field: 'cvsOtherDetails',
    },
  },
]

const CardiovascularBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'cvsNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={CARDIOVASCULAR_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { CardiovascularBlock, CARDIOVASCULAR_BLOCK_OPTIONS }
