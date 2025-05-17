'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect, FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'
import { CODESETS } from '@/constants'

interface RouteInformationProps {
  index: number
}

const RouteInformation = ({ index }: RouteInformationProps) => {
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Route</FormFieldLabel>
        <CodesetSelect
          name={`drugList.${index}.doseRouteCode`}
          codeset={CODESETS.PrescriptionRouteList}
          className="h-6 w-full"
          size="1"
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Frequency</FormFieldLabel>
        <CodesetSelect
          placeholder="Select"
          name={`drugList.${index}.doseFrequencyCode`}
          codeset={CODESETS.PrescriptionFrequencyList}
          size="1"
          className="w-full"
        />
      </FormFieldContainer>
      
    </Flex>
  )
}

export { RouteInformation }
