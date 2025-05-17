'use client'

import { useEffect, useMemo } from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { UpdateMedicationSchema } from './schema'

interface DateTimeInformationProps {
  index: number
}

const DateTimeInformation = ({ index }: DateTimeInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()

  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1 ">
        <Flex direction="column" gap="1">
          <FormFieldLabel>Start Date</FormFieldLabel>
          <TextField.Root
            type="date"
            size="1"
            {...form.register(`drugList.${index}.startDateTime`)}
            className="border-pp-gray-2 h-7   border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="flex-1 ">
        <Flex direction="column" gap="1">
          <FormFieldLabel>End Date</FormFieldLabel>
          <TextField.Root
            type="date"
            size="1"
            {...form.register(`drugList.${index}.endDateTime`)}
            className="border-pp-gray-2 h-7 w-full  border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
            disabled
          />
        </Flex>
      </FormFieldContainer>
    </Flex>
  )
}

export { DateTimeInformation }
