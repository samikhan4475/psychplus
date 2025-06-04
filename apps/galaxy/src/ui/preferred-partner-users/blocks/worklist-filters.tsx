import React from 'react'
import { Flex } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PreferredPartnerFiltersSchemaType } from './schema'

interface WorklistFiltersProps {
  form: UseFormReturn<PreferredPartnerFiltersSchemaType>
}

export const WorklistFilters = ({ form }: WorklistFiltersProps) => {
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)

  return (
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
  )
}
