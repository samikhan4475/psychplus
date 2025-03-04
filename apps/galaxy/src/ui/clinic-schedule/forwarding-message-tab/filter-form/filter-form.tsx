'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { FromDatePicker } from './form-date-picker'
import {
  forwardingMessageFilterSchema,
  ForwardingMessageFilterSchemaType,
} from './schema'
import { SearchButton } from './search-button'
import { StaffSelect } from './staff-select'
import { StatusSelect } from './status-select'
import { ToDatePicker } from './to-date-picker'

interface FilterFormProps {
  userId: number
}
const FilterForm = ({ userId }: FilterFormProps) => {
  const { fetchForwardingMessageList, fetchStaffOptions } = useStore(
    (state) => ({
      fetchForwardingMessageList: state.fetchForwardingMessageList,
      fetchStaffOptions: state.fetchStaffOptions,
    }),
  )

  const form = useForm<ForwardingMessageFilterSchemaType>({
    resolver: zodResolver(forwardingMessageFilterSchema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      forwardingId: '',
      recordStatus: '',
    },
  })
  const onSubmit: SubmitHandler<ForwardingMessageFilterSchemaType> = ({
    forwardingId,
    recordStatus,
    fromDate,
    toDate,
  }) => {
    const payload = sanitizeFormData({
      recordStatuses: recordStatus ? [recordStatus] : undefined,
      fromDate: formatDateToISOString(fromDate) ?? '',
      toDate: formatDateToISOString(toDate, true) ?? '',
      userIds: forwardingId ? [Number(forwardingId)] : [userId],
    })
    return fetchForwardingMessageList(payload)
  }

  useEffect(() => {
    fetchStaffOptions(userId)
  }, [fetchStaffOptions, userId])
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white !flex-row items-center gap-2 px-2 py-1"
    >
      <FromDatePicker />
      <ToDatePicker />
      <StaffSelect />
      <StatusSelect />
      <ClearButton userId={userId} />
      <SearchButton />
    </FormContainer>
  )
}

export { FilterForm }
