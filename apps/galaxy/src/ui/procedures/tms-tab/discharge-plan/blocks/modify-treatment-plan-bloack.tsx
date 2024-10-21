import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SelectInput } from '@/components'

const TREATMENT_PLAN_OPTIONS = [
  {
    label: 'Maintenance',
    value: 'maintenance',
  },
  {
    label: 'Standard',
    value: 'standard',
  },
  {
    label: 'SAINT',
    value: 'saint',
  },
  {
    label: 'Theta-Burst Stimulation',
    value: 'thetaBurstStimulation',
  },
]

const ModifyTreatmentPlanBlock = () => {
  return (
    <Flex align={'center'} gap={'1'}>
      <Text>Treatment plan will be modified to the</Text>
      <SelectInput
        placeholder="Select"
        field=""
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={TREATMENT_PLAN_OPTIONS}
        tooltip
      />
      <Text>Protocol.</Text>
    </Flex>
  )
}

export default ModifyTreatmentPlanBlock
