'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { ScheduleTemplateSchemaType } from './schedule-report-form'
import { useFormContext } from 'react-hook-form'

interface DistributionGroupsSelectProps{
  distributionGroupsOptions: SelectOptionType[],
  isLoading: boolean
}
const DistributionGroupsSelect = ({distributionGroupsOptions , isLoading}:DistributionGroupsSelectProps) => {
  const form = useFormContext<ScheduleTemplateSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1 mt-3" required>
        Distribution Groups
      </FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('distributionGroups')}
        options={distributionGroupsOptions}
        onChange={(values) => form.setValue('distributionGroups', values)}
        className="w-full"
        placeholder={isLoading ? "Loading..." : "Search by keyword"}
        disabled={isLoading}
        
      />
      <FormFieldError name="distributionGroups" />
    </FormFieldContainer>
  )
}
export { DistributionGroupsSelect }

