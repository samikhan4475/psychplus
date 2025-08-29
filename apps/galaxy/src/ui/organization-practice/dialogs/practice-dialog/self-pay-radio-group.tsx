import React from 'react'
import { RadioGroup } from '@/components'

const selfPayOptions = [
  { label: 'Master Self Pay', value: 'MasterSelfPay' },
  { label: 'Separate Self Pay', value: 'SeperateSelfPay' },
]

const SelfPayRadioGroup = () => (
  <RadioGroup
    className="bg-white border-none"
    field="selfPayType"
    options={selfPayOptions}
  />
)

export { SelfPayRadioGroup, selfPayOptions }
