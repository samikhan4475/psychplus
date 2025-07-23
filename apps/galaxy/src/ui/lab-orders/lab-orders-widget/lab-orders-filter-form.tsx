'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
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
import {
  formatDateToISOString,
  getPaddedDateString,
  sanitizeFormData,
} from '@/utils'
import { OrderFromDateField } from '../lab-order-results-widget/order-from-date-field'
import { OrderToDateField } from '../lab-order-results-widget/order-to-date-field'
import { PatientField } from '../lab-order-results-widget/patient-field'
import { StatusSelectFilter } from '../lab-order-results-widget/status-select-filter'
import { LocationSelect } from './location-select'
import { OrderBySelect } from './order-by-select'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { TestField } from './test-field'
import { LabOrderPayload, OrderStatus } from './types'

const schema = z.object({
  orderCreatedFromDate: z.custom<DateValue | null>().nullable(),
  orderCreatedToDate: z.custom<DateValue | null>().nullable(),
  orderCreatedDate: z.custom<DateValue | null>().nullable(),
  orderingStaffId: z.string().optional(),
  labTestName: z.string().trim().optional(),
  orderingLab: z.string().optional(),
  orderStatus: z.string().optional(),
  labTestCode: z.string().trim().optional(),
  patientName: z.string().trim().optional(),
})

export type SchemaType = z.infer<typeof schema>

const LabOrdersFilterForm = ({
  isInboxLabOrder = false,
  defaultPayload = {},
}: {
  isInboxLabOrder?: boolean
  defaultPayload?: LabOrderPayload
}) => {
  const searchParams = useSearchParams()
  const { fetch } = useStore()
  const appointmentId = !isInboxLabOrder ? searchParams.get('id') ?? '0' : null

  const { id } = useParams<{ id: string }>()
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER
  const defaultOrderingStaffId = isPrescriber ? String(staffId) : ''
  const canOrderBy = useHasPermission('changeOrderByProviderLabResultView')

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderCreatedFromDate: null,
      orderCreatedToDate: null,
      orderCreatedDate: undefined,
      orderingStaffId: isInboxLabOrder ? defaultOrderingStaffId : '',
      labTestName: '',
      orderingLab: '',
      orderStatus: isInboxLabOrder ? OrderStatus.Unsigned : '',
      labTestCode: '',
      patientName: '',
    },
  })

  const orderByStaff = form.watch('orderingStaffId')

  useEffect(() => {
    if (orderByStaff && orderByStaff !== String(staffId) && !canOrderBy) {
      form.setValue('orderingStaffId', defaultOrderingStaffId)
      toast.error('You do not have permission to change the ordering staff')
    }
  }, [orderByStaff, staffId, canOrderBy, defaultOrderingStaffId])

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      orderCreatedFromDate: null,
      orderCreatedToDate: null,
      orderCreatedDate: undefined,
      orderingStaffId: isInboxLabOrder ?  defaultOrderingStaffId : '',
      labTestName: '',
      orderingLab: '',
      orderStatus: isInboxLabOrder ? OrderStatus.Unsigned : '',
      labTestCode: '',
      patientName: '',
    })
    fetch(appointmentId, {
      ...defaultPayload,
      ...(appointmentId && appointmentId !== '0'
        ? { appointmentIds: [appointmentId] }
        : {}),
      ...(!isInboxLabOrder ? { patientId: [id] } : {}),
      ...(isInboxLabOrder ? { resourceStatusList: ['Active'] } : {}),
    },1,true)
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      orderCreatedDate: formatDateToISOString(data.orderCreatedDate)?.split(
        'T',
      )[0],
      orderCreatedFromDate: data.orderCreatedFromDate
        ? getPaddedDateString(data.orderCreatedFromDate)
        : null,
      orderCreatedToDate: data.orderCreatedToDate
        ? getPaddedDateString(data.orderCreatedToDate)
        : null,
    }
    const sanitizedData = sanitizeFormData(formattedData)
    const payload = {
      ...defaultPayload,
      ...(appointmentId && appointmentId !== '0'
        ? { appointmentIds: [appointmentId] }
        : {}),
      ...(!isInboxLabOrder ? { patientId: [id] } : {}),
      ...(isInboxLabOrder ? { resourceStatusList: ['Active'] } : {}),
      ...sanitizedData,
    }
    fetch(appointmentId, payload,1,true)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex gap="2" wrap="wrap">
        {isInboxLabOrder && (
          <>
            <OrderFromDateField />
            <OrderToDateField />
            <PatientField />
            <StatusSelectFilter isInboxLabOrder={isInboxLabOrder} />
          </>
        )}
        <OrderBySelect />
        <LocationSelect />
        <TestField />
        {!isInboxLabOrder && <StatusSelect />}

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
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { LabOrdersFilterForm }
