'use client'

import { RadioSelectSection } from '@/components'

const BLOCK_ID = 'dischargeTimeSpent'
const BLOCK_LABEL = 'Discharge Time Spent'

const BLOCK_OPTIONS = [
  {
    label: '< 30 mins',
    value: '< 30 mins',
  },
  {
    label: '> 30 mins',
    value: '> 30 mins',
  },
]

const DischargeTimeSpentBlock = () => {
  return (
    <RadioSelectSection
      label={BLOCK_LABEL}
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export { DischargeTimeSpentBlock }
