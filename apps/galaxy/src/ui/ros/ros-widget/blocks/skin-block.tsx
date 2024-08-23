import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'skin'

const BLOCK_TITLE = 'Skin'

const BLOCK_OPTIONS = [
  {
    label: 'No concerns',
    value: 'noConcerns',
  },
  {
    label: 'Skin Lesions/Rash',
    value: 'skinLesionsRash',
  },
  {
    label: 'Hair changes',
    value: 'hairChanges',
  },
  {
    label: 'Breast changes',
    value: 'breastChanges',
  },
  {
    label: 'Nipple discharge',
    value: 'nippleDischarge',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const SkinBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { SkinBlock }
