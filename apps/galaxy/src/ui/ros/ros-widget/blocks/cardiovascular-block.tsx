import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'cardiovascular'

const BLOCK_TITLE = 'Cardiovascular'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Chest pain',
    value: 'chestPain',
  },
  {
    label: 'Shortness of breath',
    value: 'shortnessOfBreath',
  },
  {
    label: 'Palpitations',
    value: 'palpitations',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const CardiovascularBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { CardiovascularBlock }
