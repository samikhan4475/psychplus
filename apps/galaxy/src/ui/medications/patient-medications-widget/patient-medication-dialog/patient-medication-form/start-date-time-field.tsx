'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'
import { StartDateTimeInput } from './start-date-time-input'

const StartDateTime = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const startDateField = getFieldName(index, 'startDateTime')

  return (
    <FormFieldContainer className="flex-1 flex-row gap-2">
      <Flex direction="column" gap="1">
        <FormFieldLabel required>Start Date & time</FormFieldLabel>
        <TextField.Root
          type="date"
          size="1"
          {...form.register(startDateField)}
          className="border-pp-gray-2 h-7   border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
        />
        <FormFieldError name={startDateField} />
      </Flex>
      <StartDateTimeInput index={index} />
    </FormFieldContainer>
  )
}

export { StartDateTime }
