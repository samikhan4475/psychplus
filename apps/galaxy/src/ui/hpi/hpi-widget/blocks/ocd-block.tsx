import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'ocd'

const BLOCK_TITLE = 'OCD (Obsessive-compulsive disorder)'

const BLOCK_OPTIONS = [
  { label: 'Checking', value: 'ocdChecking' },
  { label: 'Washing', value: 'ocdWashing' },
  { label: 'Counting', value: 'ocdCounting' },
  { label: 'Hoarding', value: 'ocdHoarding' },
  { label: 'Picking', value: 'ocdPicking' },
]

const OcdBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
      parentField="chiefComplaint"
      valueInParent="ccOcd"
    />
  )
}

export { OcdBlock }
