import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'obsession'

const BLOCK_TITLE = 'Obsession/Ocd'

const BLOCK_OPTIONS = [
  { label: 'Contamination', value: 'obsContamination' },
  { label: 'Doubt', value: 'obsDoubt' },
  { label: 'Somatic', value: 'obsSomatic' },
  { label: 'Aggression', value: 'obsAggression' },
  { label: 'Sexual', value: 'obsSexual' },
  { label: 'Checking', value: 'obsChecking' },
  { label: 'Washing', value: 'obsWashing' },
  { label: 'Counting', value: 'obsCounting' },
  { label: 'Hoarding', value: 'obsHoarding' },
  { label: 'Picking', value: 'obsPicking' },
]

const ObsessionBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccObsession"
    />
  )
}

export { ObsessionBlock }
