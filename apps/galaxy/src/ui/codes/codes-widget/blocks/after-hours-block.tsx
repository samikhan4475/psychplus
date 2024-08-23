import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'afterHours'

const BLOCK_TITLE = 'After Hours'

const BLOCK_OPTIONS = [
  {
    label: '99050',
    value: '99050',
  },
]

const AfterHoursBlock = () => {
  return (
    <GroupSelectSection
      label={BLOCK_TITLE}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { AfterHoursBlock }
