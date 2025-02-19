'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitTypeSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.VisitType)
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Type</FieldLabel>
      <Flex className="flex-1" align="center">
        <MultiSelectField
          defaultValues={form.watch('visitTypes')}
          options={options}
          className="flex-1"
          onChange={(values) => {
            form.setValue('visitTypes', values, { shouldDirty: true })
          }}
          menuClassName="w-[155px]"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
