'use client'

import { useFormContext } from 'react-hook-form'
import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { BlockProps } from '../../types'
import { numericLengthConstraint } from '../../utils'

const PatientWeightInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="flex-1 flex-row !gap-2">
      <FormFieldLabel className="!text-1" required>
        Patient weight
      </FormFieldLabel>
      <NumericInput
        field="patientWeight"
        placeholder=""
        prefix=""
        suffixText="Ibs"
        className="h-5 w-16 rounded-1"
        allowNegative={false}
        decimalScale={2}
        formatOnBlurOnly={true}
        isAllowed={numericLengthConstraint({
          maxDigits: 3,
          maxDecimalPlaces: 2,
        })}
        disabled={disabled}
        onChangeCallback={(value) => {
          if (value) {
            form.trigger('patientWeight')
          }
        }}
      />
      <FormFieldError name="patientWeight" />
    </FormFieldContainer>
  )
}

export { PatientWeightInput }
