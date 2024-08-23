import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'alcoholSubstanceUse'

const BLOCK_TITLE = 'Alcohol/Substance Use'

const BLOCK_OPTIONS = [
  {
    label: '99408',
    value: '99408',
  },
  {
    label: '99409',
    value: '99409',
  },
]

const AlcoholSubstanceBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AlcoholSubstanceBlock }
