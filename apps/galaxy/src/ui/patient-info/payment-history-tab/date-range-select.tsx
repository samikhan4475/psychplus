'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getDatesForDateRange } from '@/utils'
import { SchemaType } from './filter-form'

const YearlyOptionDisplay = '360 Days'
const DateRangeSelect = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.QueryByNextDays)

  const options = codes
    .filter(
      (item) =>
        item.attributes?.some((attr) => attr.name === 'Group') &&
        item.display !== YearlyOptionDisplay,
    )
    .map((item) => ({
      label: item.display,
      value:
        item.attributes?.find((attr) => attr.name === 'SortValue')?.value ??
        item.value,
    }))

  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="whitespace-nowrap !text-1">
        Date Range
      </FormFieldLabel>

      <SelectInput
        field="dateRange"
        placeholder="Select Range"
        buttonClassName="border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]"
        onValueChange={(value) => {
          form.setValue('dateRange', value)
          const { startDate, endDate } = getDatesForDateRange(value)
          form.setValue('startDate', startDate)
          form.setValue('endDate', endDate)
        }}
        options={options}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { DateRangeSelect }
