'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { formatDate, formatDateToISOString, sanitizeFormData } from '@/utils'
import ClearButton from './clear-button'
import { transformOut } from './data'
import { Filters } from './filters'
import { FiltersToggleButton } from './filters-toggle-button'
import { SearchButton } from './search-button'
import { useStore } from './store'

const schema = z.object({
  staffIds: z.array(z.string()).optional(),
  locationIds: z.array(z.string()).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  npi: z.string().optional(),
  dateOfBirth: z.custom<DateValue | null>().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  roleCodes: z.array(z.string()).optional(),
  statuses: z.array(z.string()).optional(),
  gender: z.string().optional(),
  staffUserRoleIds: z.array(z.string()).optional(),
  staffType: z.string().optional(),
  spokenLanguage: z.string().optional(),
  providerType: z.string().optional(),
  organizationsIds: z.array(z.string()).optional(),
  practicesIds: z.array(z.string()).optional(),
  providerAttributionCodes: z.array(z.string()).optional(),
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
      staffIds: [''],
      locationIds: [''],
      firstName: '',
      lastName: '',
      name: '',
      npi: '',
      dateOfBirth: undefined,
      email: '',
      phone: '',
      roleCodes: [''],
      statuses: [''],
      gender: '',
      staffUserRoleIds: [''],
      staffType: '',
      spokenLanguage: '',
      providerType: '',
      organizationsIds: [''],
      practicesIds: [''],
      providerAttributionCodes: [],
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const finalModel = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? formatDate(
            formatDateToISOString(data.dateOfBirth) ?? '',
            'yyyy-MM-dd',
          )
        : '',
    }
    const cleanedData = sanitizeFormData(finalModel)
    return search(transformOut(cleanedData), 1, true)
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
