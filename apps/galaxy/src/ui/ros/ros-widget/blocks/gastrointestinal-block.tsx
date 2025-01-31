import { useFormContext } from 'react-hook-form'
import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'gastrointestinal'

const BLOCK_TITLE = 'Gastrointestinal'

const GASTROINTESTINAL_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'giNoConcerns',
  },
  {
    label: 'Nausea/Vomiting',
    value: 'giNauseaVomiting',
  },
  {
    label: 'Diarrhea',
    value: 'giDiarrhea',
  },
  {
    label: 'Constipation',
    value: 'giConstipation',
  },
  {
    label: 'Other',
    value: 'giOther',
    details: {
      type: 'text',
      label: '',
      field: 'giOtherDetails',
    },
  },
]

const GastrointestinalBlock = () => {
  const form = useFormContext()
  const error = form.formState?.errors
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'giNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={GASTROINTESTINAL_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
      chipClassName={`${
        error?.reviewSystemError?.message ? 'border border-tomato-11' : ''
      }`}
    />
  )
}

export { GastrointestinalBlock, GASTROINTESTINAL_BLOCK_OPTIONS }
