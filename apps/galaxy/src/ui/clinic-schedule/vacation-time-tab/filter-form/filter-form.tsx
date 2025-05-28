'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { FromDatePicker } from './from-date-picker'
import { schema, VacationTimeSchemaType } from './schema'
import { SearchButton } from './search-button'
import { StatusSelect } from './status-select'
import { ToDatePicker } from './to-date-picker'

const FilterForm = ({ staffId }: { staffId: string }) => {
  const { fetchLocationTimeList } = useStore((state) => ({
    fetchLocationTimeList: state.fetchLocationTimeList,
  }))
  const form = useForm<VacationTimeSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      status: '',
    },
  })

  const onSubmit: SubmitHandler<VacationTimeSchemaType> = ({
    fromDate,
    toDate,
    ...data
  }) => {
    const payload = sanitizeFormData({
      ...data,
      fromDate: formatDateToISOString(fromDate) ?? '',
      toDate: formatDateToISOString(toDate, true) ?? '',
      providerStaffIds: [staffId],
    })

    return fetchLocationTimeList(payload, 1, true)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white !flex-row  gap-2 px-2 py-1"
    >
      <FromDatePicker />
      <ToDatePicker />
      <StatusSelect />
      <ClearButton />
      <SearchButton />
    </FormContainer>
  )
}

export { FilterForm }
