import React from 'react'
import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'followUpBlock'
const BLOCK_OPTIONS = [
  {
    label: 'PHQ-9',
    value: 'PHQ-9',
  },
  {
    label: 'PHQ-2',
    value: 'PHQ-2',
  },
  {
    label: 'HAM-D',
    value: 'HAM-D',
  },
  {
    label: 'BDI',
    value: 'BDI',
  },
  {
    label: 'GDS',
    value: 'GDS',
  },
]
const FollowUpBlock = () => {
  return (
    <GroupSelectSection
      label="Follow Up Assessment Screening"
      field={BLOCK_ID}
      options={BLOCK_OPTIONS}
    />
  )
}

export default FollowUpBlock
