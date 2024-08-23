import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'gastrointestinal'

const BLOCK_TITLE = 'Gastrointestinal'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Nausea/Vomiting',
    value: 'nauseaVomiting',
  },
  {
    label: 'Diarrhea',
    value: 'diarrhea',
  },
  {
    label: 'Constipation',
    value: 'constipation',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const GastrointestinalBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { GastrointestinalBlock }
