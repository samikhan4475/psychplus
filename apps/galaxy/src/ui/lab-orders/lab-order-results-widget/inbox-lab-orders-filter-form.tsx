'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { getPaddedDateString, sanitizeFormData } from '@/utils'
import { LocationSelect } from '../lab-orders-widget/location-select'
import { OrderBySelect } from '../lab-orders-widget/order-by-select'
import { TestField } from '../lab-orders-widget/test-field'
import { IsReviewedField } from './is-reviewed-field'
import { OrderFromDateField } from './order-from-date-field'
import { OrderResultFromDateField } from './order-result-from-date-field'
import { OrderResultToDateField } from './order-result-to-date-field'
import { OrderToDateField } from './order-to-date-field'
import { PatientField } from './patient-field'
import { StatusSelectFilter } from './status-select-filter'
import { useStore } from './store'
import { OrderStatus } from './types'

const schema = z.object({
  orderCreatedFromDate: z.custom<DateValue | null>().nullable(),
  orderCreatedToDate: z.custom<DateValue | null>().nullable(),
  resultObservationFromDate: z.custom<DateValue | null>().nullable(),
  resultObservationToDate: z.custom<DateValue | null>().nullable(),
  orderingStaffId: z.string().optional(),
  labTestName: z.string().trim().optional(),
  orderingLab: z.string().optional(),
  orderStatus: z.string().optional(),
  labTestCode: z.string().trim().optional(),
  patientName: z.string().trim().optional(),
  isResultSigned: z.boolean().optional(),
})
export type SchemaType = z.infer<typeof schema>

const InboxLabOrdersFilterForm = () => {
  const { fetchLabOrderResults } = useStore()
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER
  const canOrderBy = useHasPermission('changeOrderByProviderLabResultView')
  const defaultOrderingStaffId = isPrescriber ? String(staffId) : ''
  
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderCreatedFromDate: null,
      orderCreatedToDate: null,
      resultObservationFromDate: null,
      resultObservationToDate: null,
      labTestName: '',
      orderingLab: '',
      orderStatus: OrderStatus.ResultReceived,
      labTestCode: '',
      patientName: '',
      orderingStaffId: isPrescriber ? String(staffId) : '',
      isResultSigned: false,
    },
  })

  const orderStatus = form.watch('orderStatus')
  const orderByStaff = form.watch('orderingStaffId')

  useEffect(() => {
    if (orderByStaff && orderByStaff !== String(staffId) && !canOrderBy) {
      form.setValue('orderingStaffId', defaultOrderingStaffId)
      toast.error('You do not have permission to change the ordering staff')
    }
  }, [orderByStaff, staffId, canOrderBy, defaultOrderingStaffId])

  useEffect(() => {
    if (orderStatus !== OrderStatus.ResultReceived) {
      form.setValue('resultObservationFromDate', null)
      form.setValue('resultObservationToDate', null)
      form.setValue('isResultSigned', false)
    }
  }, [orderStatus])

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    form.reset({
      orderCreatedFromDate: null,
      orderCreatedToDate: null,
      resultObservationFromDate: null,
      resultObservationToDate: null,
      labTestName: '',
      orderingLab: '',
      orderStatus: OrderStatus.ResultReceived,
      labTestCode: '',
      patientName: '',
      orderingStaffId: defaultOrderingStaffId,
      isResultSigned: false,
    })
    const payload = {
      orderStatus: OrderStatus.ResultReceived,
      isIncludePatient: true,
      isResultSigned: false,
      orderingStaffId: defaultOrderingStaffId,
    }
    fetchLabOrderResults(payload,1,true)
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      orderCreatedFromDate: data.orderCreatedFromDate
        ? getPaddedDateString(data.orderCreatedFromDate)
        : null,
      orderCreatedToDate: data.orderCreatedToDate
        ? getPaddedDateString(data.orderCreatedToDate)
        : null,
      resultObservationFromDate: data.resultObservationFromDate
        ? getPaddedDateString(data.resultObservationFromDate)
        : null,
      resultObservationToDate: data.resultObservationToDate
        ? getPaddedDateString(data.resultObservationToDate)
        : null,
    }

    const sanitizedData = sanitizeFormData(formattedData)
    const payload = {
      ...sanitizedData,
      isIncludePatient: true,
      isResultSigned: data.isResultSigned,
      isIncludeResults: !!(data.resultObservationFromDate || data.resultObservationToDate),
    }
    fetchLabOrderResults(payload,1,true)
  }

  return (
    <FormContainer
      className="bg-white flex flex-col gap-2 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex gap="2" wrap="wrap">
        <OrderFromDateField />
        <OrderToDateField />
        <PatientField />
        <OrderBySelect />
        <TestField />
        <LocationSelect />
        <StatusSelectFilter />
        {orderStatus === OrderStatus.ResultReceived && (
          <>
            <OrderResultFromDateField />
            <OrderResultToDateField />
            <IsReviewedField />
          </>
        )}
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={onClear}
        >
          Clear
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { InboxLabOrdersFilterForm }
