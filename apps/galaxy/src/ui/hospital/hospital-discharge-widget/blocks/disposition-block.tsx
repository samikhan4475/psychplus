'use client'
import {
  RadioSelectSection,
} from '@/components'

const BLOCK_ID = 'disposition'
const BLOCK_LABEL = 'Disposition'

const BLOCK_OPTIONS = [
  {
    label: 'Home',
    value: 'Home',
  },
  {
    label: 'Group home',
    value: 'Group home',
  },
  {
    label: 'RTC',
    value: 'RTC',
  },
  {
    label: 'ALF',
    value: 'ALF'
  },
  {
    label: 'Nursing Home',
    value: 'Nursing Home'
  },
  {
    label: 'Hospice',
    value: 'Hospice'
  },
  {
    label: 'Hospital',
    value: 'Hospital'
  },
  {
    label: 'Shelter',
    value: 'Shelter',
  },
  {
    label: 'CPS',
    value:'CPS',
  }
]

const DispositionBlock = () => {
  return (
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        errorField={BLOCK_ID}
      />
  )
}

export { DispositionBlock }
