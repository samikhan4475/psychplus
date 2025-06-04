import React from 'react'
import { Flex, Grid, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
  NumericInput,
} from '@/components'
import { type PreferredPartnerFiltersSchemaType } from './schema'

interface FiltersProps {
  form: ReturnType<typeof useForm<PreferredPartnerFiltersSchemaType>>
}

const Filters = ({ form }: FiltersProps) => {
  return (
    <Grid
      className="bg-white col-span-full"
      columns="6"
      gap="2"
      align="baseline"
    >
      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">User Name</FormFieldLabel>
          <TextField.Root
            size="1"
            placeholder="User name"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('userName')}
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
          <NumericInput
            field="mrn"
            allowNegative={false}
            prefix=""
            placeholder="MRN"
            decimalScale={0}
            maxLimit={Number('9'.repeat(8))}
            containerClassName="w-full"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">Date From</FormFieldLabel>
        <DatePickerInput field="dateFrom" />
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">Date To</FormFieldLabel>
        <DatePickerInput
          field="dateTo"
          minValue={form.watch('dateFrom') ?? undefined}
        />
      </FormFieldContainer>
    </Grid>
  )
}

export { Filters }
