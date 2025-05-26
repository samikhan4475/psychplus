'use client'

import { Flex } from '@radix-ui/themes'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel,
  NumberInput,
  NumericInput,
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
        <FormFieldLabel>Quantity</FormFieldLabel>
        <NumericInput
          placeholder="Quantity"
          field={`drugList.${index}.quantityValue`}
          className="h-6 w-full"
          prefix=""
          decimalScale={1}
          allowNegative={false}
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { DurationInformation }
