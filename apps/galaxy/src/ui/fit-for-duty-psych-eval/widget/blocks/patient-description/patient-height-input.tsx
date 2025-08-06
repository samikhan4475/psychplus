'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { NumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const PatientHeightInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-1 flex-row items-end !gap-2">
      <FormFieldLabel className="!text-1" required>
        Patient height, in feet and inche
      </FormFieldLabel>
      <Flex align="center" gap="2">
        <NumberInput
          field="heightFeet"
          format="##"
          placeholder=""
          suffixText="ft"
          className="h-5 w-16 rounded-1"
          disabled={disabled}
          onValueChange={(value) => {
            form.setValue('heightFeet', value)
            form.trigger('heightFeet')
          }}
        />
        <FormFieldError name="heightFeet" />
        <NumberInput
          field="heightInches"
          format="####"
          placeholder=""
          suffixText="in"
          className="h-5 w-16 rounded-1"
          disabled={disabled}
          onValueChange={(value) => {
            form.setValue('heightInches', value)
            form.trigger('heightInches')
          }}
        />
        <FormFieldError name="heightInches" />
      </Flex>
    </FormFieldContainer>
  )
}

export { PatientHeightInput }
