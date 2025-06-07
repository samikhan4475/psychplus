'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { removeEmptyValues } from '@/ui/notes/utils'
import { sanitizeFormData } from '@/utils'
import { AllVisitsParams } from '../../types'
import { formatFilterFormData } from '../../utils'
import { DateFrom } from '../date-from'
import { DateTo } from '../date-to'
import { ResetButton } from '../reset-button'
import { RoundingViewFilterGroup } from '../rounding-view-filter-group'
import { SubmitButton } from '../submit-button'
import { VisitsStateSelect } from '../visits-states-select'
import { useStore } from './store'

const schema = z.object({
  dateFrom: z.custom<DateValue | undefined>().optional(),
  dateTo: z.custom<DateValue | undefined>().optional(),
  stateCodes: z.array(z.string()).optional(),
})

type SchemaType = z.infer<typeof schema>

const AllVisitsListFilterForm = () => {
  const { search, activeFilter, setActiveFilter } = useStore((state) => ({
    search: state.search,
    activeFilter: state.activeFilter,
    setActiveFilter: state.setActiveFilter,
  }))

  const options = useCodesetOptions(CODESETS.UsStates)
  const defaultStates = options.map((state) => state.value)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      stateCodes: defaultStates,
    },
  })
  const dateFrom = form.watch('dateFrom')

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    let formattedData = formatFilterFormData(data)

    formattedData = removeEmptyValues(formattedData)
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as Partial<AllVisitsParams>
    return search(cleanedData, 1, true)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="8" gap="2" className="flex">
        <DateFrom setActiveFilter={setActiveFilter} />
        <DateTo setActiveFilter={setActiveFilter} dateFrom={dateFrom} />
        <VisitsStateSelect />
        <RoundingViewFilterGroup
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ResetButton
          search={search}
          setActiveFilter={setActiveFilter}
          defaultStates={defaultStates}
        />
        <SubmitButton />
      </Grid>
    </FormContainer>
  )
}

export { AllVisitsListFilterForm, type SchemaType }
