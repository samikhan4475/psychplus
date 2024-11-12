import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'eyes'

const BLOCK_TITLE = 'Eyes'

const EYE_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'eyesNoConcerns',
  },
  {
    label: 'Eye pain',
    value: 'eyesEyePain',
  },
  {
    label: 'Redness',
    value: 'eyesRedness',
  },
  {
    label: 'Discharge',
    value: 'eyesDischarge',
  },
  {
    label: 'Vision changes',
    value: 'eyesVisionChanges',
  },
  {
    label: 'Other',
    value: 'eyesOther',
    details: {
      type: 'text',
      label: '',
      field: 'eyesOtherDetails',
    },
  },
]

const EyesBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'eyesNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={EYE_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { EyesBlock, EYE_BLOCK_OPTIONS }
