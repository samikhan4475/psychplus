'use client'

import { Flex, Text } from '@radix-ui/themes'
import { InfoIcon } from '@/components/icons/info-icon'
import { DetailsField } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const ResultsOfAssessmentInput = ({ disabled = false }: BlockProps) => {
  return (
    <Flex direction="column" gap="1">
      <Flex gap="1" align="center">
        <InfoIcon width={18} height={18} fill="#000" />
        <Text size="2" weight="medium">
          Patient does not qualify for an ICD-10 diagnosis.
        </Text>
      </Flex>
      <DetailsField
        field="currentCity"
        label="Describe the ICD-10 diagnosis, including code, defination, and reasoning"
        disabled={disabled}
        className="min-h-14"
      />
    </Flex>
  )
}
export { ResultsOfAssessmentInput }
