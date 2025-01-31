import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'
import { useFormContext } from 'react-hook-form'

const BLOCK_ID = 'entMouth'
const BLOCK_TITLE = 'ENT/Mouth'

const EYE_MOUTH_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  { label: 'No concerns', value: 'entNoConcerns' },
  { label: 'Hearing changes/Ear pain', value: 'entHearingChangesEarPain' },
  { label: 'Sinus congestion', value: 'entSinusCongestion' },
  { label: 'Sore throat', value: 'entSoreThroat' },
  {
    label: 'Other',
    value: 'entOther',
    details: { type: 'text', label: '', field: 'entOtherDetails' },
  },
]

const EntMouthBlock = () => {
  const form = useFormContext()
  const error = form.formState?.errors
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'entNoConcerns',
  })

  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={EYE_MOUTH_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
      chipClassName={`${
        error?.reviewSystemError?.message ? 'border border-tomato-11' : ''
      }`}
    />
  )
}

export { EntMouthBlock, EYE_MOUTH_BLOCK_OPTIONS }
