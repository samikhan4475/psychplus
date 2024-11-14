'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import ClearButton from './clear-button'
import { Filters } from './filters'
import { FiltersToggleButton } from './filters-toggle-button'
import { SearchButton } from './search-button'
import { useStore } from './store'

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  staffType: z.string().optional(),
  staffRoleCode: z.string().optional(),
  credentials: z.string().optional(),
  supervisedBy: z.string().optional(),
  virtualRoomLink: z.string().optional(),
  organization: z.string().optional(),
  practice: z.string().optional(),
  providerPreference: z.string().optional(),
  email: z.string().optional(),
  homeAddress: z.string().optional(),
  dateOfBirth: z.string().optional(),
  npi: z.string().optional(),
  gender: z.string().optional(),
  language: z.string().optional(),
  status: z.string().optional(),
  phoneContact: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const StaffFilterForm = () => {
  const { search, showFilters } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      staffType: '',
      staffRoleCode: '',
      credentials: '',
      supervisedBy: '',
      virtualRoomLink: '',
      organization: '',
      practice: '',
      providerPreference: '',
      email: '',
      homeAddress: '',
      dateOfBirth: undefined,
      npi: '',
      gender: '',
      language: '',
      status: '',
      phoneContact: '',
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const cleanedData = sanitizeFormData(data)
    return search(cleanedData)
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

export { StaffFilterForm, type SchemaType }
