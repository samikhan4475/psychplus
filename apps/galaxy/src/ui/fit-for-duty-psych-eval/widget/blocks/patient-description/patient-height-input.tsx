'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { BlockProps } from '../../types'
import { numericRangeConstraint } from '../../utils'

const PatientHeightInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="flex-1 flex-row items-end !gap-2">
      <FormFieldLabel className="!text-1" required>
        Patient height
      </FormFieldLabel>
      <Flex align="center" gap="2">
        <NumericInput
          field="heightFeet"
          placeholder=""
          prefix=""
          suffixText="ft"
          className="h-5 w-16 rounded-1"
          disabled={disabled}
          allowNegative={false}
          formatOnBlurOnly={true}
          decimalScale={0}
          maxLimit={100}
          onChangeCallback={(value) => {
            if (value) {
              form.trigger('heightFeet')
            }
          }}
        />
        <FormFieldError name="heightFeet" />
        <NumericInput
          field="heightInches"
          placeholder=""
          prefix=""
          suffixText="in"
          decimalScale={2}
          allowNegative={false}
          formatOnBlurOnly={true}
          className="h-5 w-16 rounded-1"
          disabled={disabled}
          isAllowed={numericRangeConstraint({
            min: 0,
            max: 11.9,
            decimals: 2,
          })}
          onChangeCallback={(value) => {
            if (value) {
              form.trigger('heightInches')
            }
          }}
        />
        <FormFieldError name="heightInches" />
      </Flex>
    </FormFieldContainer>
  )
}

export { PatientHeightInput }
