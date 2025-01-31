import { useFormContext } from 'react-hook-form'
import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'skin'

const BLOCK_TITLE = 'Skin'

const SKIN_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'sknNoConcerns',
  },
  {
    label: 'Skin Lesions/Rash',
    value: 'sknSkinLesionsRash',
  },
  {
    label: 'Hair changes',
    value: 'sknHairChanges',
  },
  {
    label: 'Breast changes',
    value: 'sknBreastChanges',
  },
  {
    label: 'Nipple discharge',
    value: 'sknNippleDischarge',
  },
  {
    label: 'Other',
    value: 'sknOther',
    details: {
      type: 'text',
      label: '',
      field: 'sknOtherDetails',
    },
  },
]

const SkinBlock = () => {
  const form = useFormContext()
  const error = form.formState?.errors
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'sknNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={SKIN_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
      chipClassName={`${
        error?.reviewSystemError?.message ? 'border border-tomato-11' : ''
      }`}
    />
  )
}

export { SkinBlock, SKIN_BLOCK_OPTIONS }
