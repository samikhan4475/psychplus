'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DatePickerInput,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
  LoadingPlaceholder,
} from '@/components'
import { formatDateToISOString } from '@/utils'
import { useProviderRecommendationsStore } from '../store'
import { ProviderDropdown } from './provider-dropdown'
import { ProvidersRecommendationsTable } from './providers-recommendations-table'

interface ProviderRecommendationsHistoryProps {
  appointmentId: string
}

const ProviderRecommendationsHistory = ({
  appointmentId,
}: ProviderRecommendationsHistoryProps) => {
  const { history, getHistory, loading } = useProviderRecommendationsStore()

  useEffect(() => {
    if (!appointmentId) return
    getHistory(appointmentId, {})
  }, [appointmentId])

  const schema = z.object({
    historyCreatedFrom: z.custom<DateValue | undefined>().optional(),
    historyCreatedTo: z.custom<DateValue | undefined>().optional(),
    createdById: z.string().optional().default(''),
  })
  type SchemaType = z.infer<typeof schema>

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      historyCreatedFrom: undefined,
      historyCreatedTo: undefined,
      createdById: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    return await getHistory(appointmentId, {
      historyCreatedFrom: formatDateToISOString(data.historyCreatedFrom),
      historyCreatedTo: formatDateToISOString(data.historyCreatedTo),
      createdById: data.createdById,
    })
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <Flex direction="row" gap="2">
          <FormFieldContainer className="w-[174px] flex-row items-center gap-1">
            <FormFieldLabel className="pt-0.5 !text-1">From</FormFieldLabel>
            <DatePickerInput field="historyCreatedFrom" />
          </FormFieldContainer>

          <FormFieldContainer className="w-[174px] flex-row items-center gap-1">
            <FormFieldLabel className="pt-0.5 !text-1">To</FormFieldLabel>
            <DatePickerInput field="historyCreatedTo" />
          </FormFieldContainer>

          <ProviderDropdown />

          <IconButton
            type="submit"
            variant="outline"
            className="h-6 cursor-pointer bg-[#151B4A] text-[#FFF] [box-shadow:none]"
          >
            <SearchIcon width={14} height={14} />
          </IconButton>
        </Flex>
        <Flex direction="column" gap="2">
          {loading ? (
            <LoadingPlaceholder className="h-full w-full p-8" />
          ) : (
            <ProvidersRecommendationsTable recommendations={history} />
          )}
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { ProviderRecommendationsHistory }
