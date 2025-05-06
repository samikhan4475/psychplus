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
  {
    label: 'DTMS',
    value: 'dtms',
  },
]

const ModifyTreatmentPlanBlock = () => {
  return (
    <Flex align={'center'} gap={'1'}>
      <Text className="text-2">
        Treatment plan will be modified to begin the
      </Text>
      <SelectInput
        placeholder="Select"
        field="modifyTreatmentPlanDetail"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={TREATMENT_PLAN_OPTIONS}
        tooltip
      />
      <Text className="text-2">Protocol.</Text>
    </Flex>
  )
}

export default ModifyTreatmentPlanBlock
