import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'respiratory'

const BLOCK_TITLE = 'Respiratory'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Cough',
    value: 'cough',
  },
  {
    label: 'Wheezing',
    value: 'wheezing',
  },
  {
    label: 'Dyspnea',
    value: 'dyspnea',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const RespiratoryBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { RespiratoryBlock }
