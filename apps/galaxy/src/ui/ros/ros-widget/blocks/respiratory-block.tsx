import { GroupSelectOption, GroupSelectSection } from '@/components'
import { useGroupSelection } from '@/hooks/use-group-selection'

const BLOCK_ID = 'respiratory'

const BLOCK_TITLE = 'Respiratory'

const RESPIRATORY_BLOCK_OPTIONS: GroupSelectOption<string>[] = [
  {
    label: 'No concerns',
    value: 'resNoConcerns',
  },
  {
    label: 'Cough',
    value: 'resCough',
  },
  {
    label: 'Wheezing',
    value: 'resWheezing',
  },
  {
    label: 'Dyspnea',
    value: 'resDyspnea',
  },
  {
    label: 'Other',
    value: 'resOther',
    details: {
      type: 'text',
      label: '',
      field: 'resOtherDetails',
    },
  },
]

const RespiratoryBlock = () => {
  const { handleOptionSelect } = useGroupSelection({
    key: BLOCK_ID,
    value: 'resNoConcerns',
  })
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={RESPIRATORY_BLOCK_OPTIONS}
      onToggle={handleOptionSelect}
    />
  )
}

export { RespiratoryBlock, RESPIRATORY_BLOCK_OPTIONS }
