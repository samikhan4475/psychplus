'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer } from '@/components'
import { SelectOptionType } from '@/types'
import { getCalendarDateLabel, sanitizeFormData } from '@/utils'
import { BILLING_TAB } from '../constants'
import {
  CommentInput,
  DateFromInput,
  DateToInput,
  filterFormschema,
  FilterFormSchemaType,
  StaffSelect,
} from '../shared'
import { useStore } from '../store'

interface BillingFilterFormProps {
  staffOptions: SelectOptionType[]
}
const FilterForm = ({ staffOptions }: BillingFilterFormProps) => {
  const store = useStore()
  const { activeTab, fetchComments } = zustandUseStore(store, (state) => ({
    fetchComments: state.fetchComments,
    activeTab: state.activeTab,
  }))

  const isBilling = activeTab === BILLING_TAB

  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormschema),
    defaultValues: {
      startDate: null,
      endDate: null,
      partialComment: '',
      isBilling: false,
      isTreatment: true,
      staffId: '',
    },
    mode: 'onChange',
  })
  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<FilterFormSchemaType> = (data) => {
    const sanitizedData = sanitizeFormData({
      startDate: data.startDate ? getCalendarDateLabel(data.startDate) : '',
      endDate: data.endDate ? getCalendarDateLabel(data.endDate) : '',
      partialComment: data.partialComment,
      staffId: data.staffId,
    })
    return fetchComments({
      ...sanitizedData,
      isTreatment: !isBilling,
      isBilling: isBilling,
    })
  }

  const handleReset = () => {
    form.reset()
    fetchComments({
      isBilling: isBilling,
      isTreatment: !isBilling,
    })
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white w-full flex-row justify-start gap-[6px] rounded-1 px-2 py-1 shadow-2"
    >
      <DateFromInput disabled={isSubmitting} />
      <DateToInput disabled={isSubmitting} />
      <StaffSelect staffOptions={staffOptions} />
      <CommentInput />
      <Button
        color="gray"
        size="1"
        className="text-black"
        variant="outline"
        onClick={handleReset}
      >
        Clear
      </Button>
      <Button size="1" highContrast>
        <MagnifyingGlassIcon />
      </Button>
    </FormContainer>
  )
}

export { FilterForm }
