'use client'

import { Flex, Text } from '@radix-ui/themes'
import { InfoIcon } from '@/components/icons/info-icon'

const ResultsOfAssessmentHeading = () => {
  return (
    <Flex gap="1" align="center">
      <InfoIcon width={18} height={18} fill="#000" />
      <Text size="2" weight="medium">
        Patient does not qualify for an ICD-10 diagnosis.
      </Text>
    </Flex>
  )
}
export { ResultsOfAssessmentHeading }
