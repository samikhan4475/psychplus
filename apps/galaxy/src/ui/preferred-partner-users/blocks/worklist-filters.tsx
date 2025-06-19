import React from 'react'
import { Flex, Grid, TextField } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import {
  DatePickerInput,
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PreferredPartnerWorklistFiltersSchemaType } from './worklist-schema'

interface WorklistFiltersProps {
  form: UseFormReturn<PreferredPartnerWorklistFiltersSchemaType>
}

export const WorklistFilters = ({ form }: WorklistFiltersProps) => {
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)

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
          <FormFieldLabel className="!text-1">SSN</FormFieldLabel>
          <TextField.Root
            size="1"
            placeholder="SSN"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('ssn')}
          />
        </Flex>
      </FormFieldContainer>
      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">User Status</FormFieldLabel>
          <DropdownSelect
            field="userStatus"
            options={statusOptions}
            placeholder="Select Status"
            buttonClassName="h-6 w-full"
            onValueChange={(value) => {
              form.setValue('userStatus', value, { shouldDirty: true })
            }}
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
