'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { AutoTextFilterSchemaType, schema } from './schema'
import { SearchAutoText } from './search-auto-text'

const FilterForm = () => {
  const { search } = useStore((state) => ({ search: state.fetchAutoText }))
  const form = useForm<AutoTextFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      search: '',
    },
  })

  const onSubmit: SubmitHandler<AutoTextFilterSchemaType> = async (data) => {
    return search(data.search)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex flex-row gap-3"
    >
      <SearchAutoText />
    </FormContainer>
  )
}

export { FilterForm }
