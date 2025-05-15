import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import {
  crisisActionPlan,
  emergencyResources,
} from '@/ui/quicknotes/actual-note-view/psychiatry-assessment-plan/constants'
import { LabelAndValue } from '@/ui/quicknotes/actual-note-view/shared'

const EmergencyBlock = () => {
  return (
    <>
      <Text className="whitespace-nowrap text-1 font-medium">
        Emergency Resources Provided{' '}
      </Text>

      <Box>
        <ul className="list-disc pl-8">
          {Object.entries(emergencyResources).map(([label, value]) => (
            <li key={value} >
              <Text
                className="whitespace-pre-wrap break-words text-1"
                weight="regular"
              >
                {label} : {value}
              </Text>
            </li>
          ))}
        </ul>
      </Box>

      <LabelAndValue label={'Crisis Action Plan Provided'} value={crisisActionPlan} />
    </>
  )
}

export default EmergencyBlock
