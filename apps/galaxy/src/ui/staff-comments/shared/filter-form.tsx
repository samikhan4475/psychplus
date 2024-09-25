'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { SelectOptionType } from '@/types'
import { getCalendarDateLabel } from '@/utils'
import {
  CommentInput,
  DateFromInput,
  DateToInput,
  filterFormschema,
  FilterFormSchemaType,
  StaffSelect,
} from '../shared'
import { useStore } from '../store'
import { sanitizeObject } from '../utils'

interface BillingFilterFormProps {
  staffOptions: SelectOptionType[]
  patientId: string
}
const FilterForm = ({ patientId, staffOptions }: BillingFilterFormProps) => {
  const { fetchComments, activeTab } = useStore((state) => ({
    fetchComments: state.fetchComments,
    activeTab: state.activeTab,
  }))
  const isBilling = activeTab === 'Billing'

  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormschema),
    defaultValues: {
      startDate: null,
      endDate: null,
      partialComment: '',
      isBilling: false,
      isTreatment: true,
      patientId: patientId,
      staffId: '',
    },
    mode: 'onChange',
  })
  const { isDirty, isSubmitting } = form.formState

  const onSubmit: SubmitHandler<FilterFormSchemaType> = (data) => {
    if (!isDirty) return

    const sanitizedData = sanitizeObject({
      PatientId: data.patientId,
      StartDate: data.startDate ? getCalendarDateLabel(data.startDate) : '',
      EndDate: data.endDate ? getCalendarDateLabel(data.endDate) : '',
      PartialComment: data.partialComment,
      IsBilling: isBilling,
      IsTreatment: !isBilling,
      StaffId: data.staffId,
    })
    return fetchComments(sanitizedData)
  }

  const handleReset = () => {
    if (!isDirty) return
    form.reset()
    fetchComments({
      PatientId: patientId,
      IsTreatment: !isBilling,
      IsBilling: isBilling,
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
