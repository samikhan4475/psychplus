import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'substance'

const BLOCK_TITLE = 'Substance'

const BLOCK_OPTIONS = [
  {
    label: 'Tobacco',
    value: 'tobacco',
  },
  {
    label: 'Alcohol',
    value: 'alcohol',
  },
  {
    label: 'Opioids',
    value: 'opioids',
  },
  {
    label: 'Marijuana',
    value: 'marijuana',
  },
  {
    label: 'Benzos',
    value: 'benzos',
  },
  {
    label: 'Cocaine',
    value: 'cocaine',
  },
  {
    label: 'Amphetamine',
    value: 'amphetamine',
  },
  {
    label: 'PCP',
    value: 'pcp',
  },
  {
    label: 'Inhalant',
    value: 'inhalant',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const SubstanceBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { SubstanceBlock }
