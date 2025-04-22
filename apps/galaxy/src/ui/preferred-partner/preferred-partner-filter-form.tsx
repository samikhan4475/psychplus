'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import ClearButton from './clear-button'
import { Filters } from './filters'
import { FiltersToggleButton } from './filters-toggle-button'
import { SearchButton } from './search-button'
import { useStore } from './store'

const schema = z.object({})

type SchemaType = z.infer<typeof schema>

const PreferredPartnerFilterForm = () => {
  const showFilters = useStore((state) => state.showFilters)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: {},
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // Search will be implemented here
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white gap-2 px-2 py-3"
    >
      {showFilters && <Filters />}
      <Flex gap="2" align="center" justify="end">
        <FiltersToggleButton />
        <ClearButton />
        <SearchButton />
      </Flex>
    </FormContainer>
  )
}

export { PreferredPartnerFilterForm, type SchemaType }
