import { useFormContext } from 'react-hook-form'
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
  const form = useFormContext()
  const error = form.formState?.errors
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
      chipClassName={`${
        error?.reviewSystemError?.message ? 'border border-tomato-11' : ''
      }`}
    />
  )
}

export { CardiovascularBlock, CARDIOVASCULAR_BLOCK_OPTIONS }
