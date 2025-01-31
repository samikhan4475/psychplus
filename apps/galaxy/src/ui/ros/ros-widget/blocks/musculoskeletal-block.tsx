import { useFormContext } from 'react-hook-form'
import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'musculoskeletal'

const BLOCK_TITLE = 'Musculoskeletal'

const MUSCULORSKELETAL_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'msuNoConcerns',
  },
  {
    label: 'Myalgias',
    value: 'msuMyalgias',
  },
  {
    label: 'Joint/musicle stiffness',
    value: 'msuJointMuscleStiffness',
  },
  {
    label: 'Breast changes',
    value: 'msuBreastChanges',
  },
  {
    label: 'Other',
    value: 'msuOther',
    details: {
      type: 'text',
      label: '',
      field: 'msuOtherDetails',
    },
  },
]

const MusculoskeletalBlock = () => {
  const form = useFormContext()
  const error = form.formState?.errors
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'msuNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={MUSCULORSKELETAL_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
      chipClassName={`${
        error?.reviewSystemError?.message ? 'border border-tomato-11' : ''
      }`}
    />
  )
}

export { MusculoskeletalBlock, MUSCULORSKELETAL_BLOCK_OPTIONS }
