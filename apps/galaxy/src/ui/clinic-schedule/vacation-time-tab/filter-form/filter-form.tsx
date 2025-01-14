'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { FromDatePicker } from './from-date-picker'
import { schema, VacationTimeSchemaType } from './schema'
import { SearchButton } from './search-button'
import { StatusSelect } from './status-select'
import { ToDatePicker } from './to-date-picker'

const FilterForm = () => {
  const { fetchLocationTimeList } = useStore((state) => ({
    fetchLocationTimeList: state.fetchLocationTimeList,
  }))
  const form = useForm<VacationTimeSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      CreatedFrom: undefined,
      CreatedTo: undefined,
      recordStatus: '',
    },
  })

  const onSubmit: SubmitHandler<VacationTimeSchemaType> = (data) => {
    console.log(data)
    return fetchLocationTimeList()
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
