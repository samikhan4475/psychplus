import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'obsession'

const BLOCK_TITLE = 'Obsession'

const BLOCK_OPTIONS = [
  { label: 'Contamination', value: 'obsContamination' },
  { label: 'Doubt', value: 'obsDoubt' },
  { label: 'Somatic', value: 'obsSomatic' },
  { label: 'Aggression', value: 'obsAggression' },
  { label: 'Sexual', value: 'obsSexual' },
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
