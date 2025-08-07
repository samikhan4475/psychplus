'use client'

import { Flex } from '@radix-ui/themes'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel,
  NumberInput,
} from '@/components'
import { CODESETS } from '@/constants'

interface DurationInformationProps {
  index: number
}

const DurationInformation = ({ index }: DurationInformationProps) => {
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Duration</FormFieldLabel>
        <NumberInput
          format="##"
          placeholder="Duration"
          field={`drugList.${index}.daysSupply`}
          className="h-6 w-full"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Duration Unit</FormFieldLabel>
        <CodesetSelect
          name={`drugList.${index}.durationUnitCode`}
          placeholder="Select"
          codeset={CODESETS.DurationUnit}
          size="1"
          className="h-6 w-full"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Drug Form</FormFieldLabel>
        <CodesetSelect
          className="h-6 w-full"
          name={`drugList.${index}.doseFormCode`}
          codeset={CODESETS.PrescriptionDosageFormList}
          size="1"
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { DurationInformation }
