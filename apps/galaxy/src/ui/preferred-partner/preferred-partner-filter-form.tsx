'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import ClearButton from './clear-button'
import { Filters } from './filters'
import { FiltersToggleButton } from './filters-toggle-button'
import { SearchButton } from './search-button'
import { useStore } from './store'
import { formatDateField } from './utils'

type DateType = DateValue | null | string
const schema = z.object({
  dateFrom: z.custom<DateType>().optional(),
  dateTo: z.custom<DateType>().optional(),
  name: z.string().optional(),
  individualRate: z.string().optional(),
  coupleRate: z.string().optional(),
  familyRate: z.string().optional(),
  plusChargeAmount: z.string().optional(),
  serviceChargeAmount: z.string().optional(),
  startDate: z.custom<DateType>().optional(),
  nextPaymentDate: z.custom<DateType>().optional(),
  payerStatusList: z.array(z.string()).optional(),
  fixedPaymentTypeList: z.array(z.string()).optional(),
  billingFrequencyList: z.array(z.string()).optional(),
  paymentStatuses: z.array(z.string()).optional(),
  subscriptionStatusList: z.array(z.string()).optional(),
  address: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const PreferredPartnerFilterForm = () => {
  const { search, showFilters } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      name: '',
      individualRate: '',
      coupleRate: '',
      familyRate: '',
      plusChargeAmount: '',
      serviceChargeAmount: '',
      startDate: null,
      nextPaymentDate: null,
      fixedPaymentTypeList: [],
      payerStatusList: [],
      billingFrequencyList: [],
      paymentStatuses: [],
      subscriptionStatusList: [],
    },
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const finalModel = {
      ...data,
      dateFrom: formatDateField(data.dateFrom as DateValue),
      dateTo: formatDateField(data.dateTo as DateValue),
      startDate: formatDateField(data.startDate as DateValue),
      nextPaymentDate: formatDateField(data.nextPaymentDate as DateValue),
    }
    const cleanedData = sanitizeFormData(finalModel)
    return search(cleanedData)
  }

  const subscriptionStatus = form.watch('subscriptionStatusList')?.[0]

  useEffect(() => {
    if (subscriptionStatus?.includes('_')) {
      const [, paymentType] = subscriptionStatus.split('_')
      form.setValue('payerStatusList', [paymentType])
      form.setValue('fixedPaymentTypeList', [])
    } else if (subscriptionStatus) {
      form.setValue('fixedPaymentTypeList', [subscriptionStatus])
      form.setValue('subscriptionStatusList', [subscriptionStatus])
    }
  }, [subscriptionStatus])

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
