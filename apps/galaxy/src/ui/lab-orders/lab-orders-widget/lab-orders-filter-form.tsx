'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { LocationSelect } from './location-select'
import { OrderBySelect } from './order-by-select'
import { OrderDateField } from './order-date-field'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { TestField } from './test-field'
import { LabOrderPayload } from './types'
import { useStore as useGlobalStore } from '@/store'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'

const schema = z.object({
  orderCreatedDate: z.custom<DateValue | null>().nullable(),
  orderingStaffId: z.string().optional(),
  labTestName: z.string().trim().optional(),
  orderingLab: z.string().optional(),
  orderStatus: z.string().optional(),
  labTestCode: z.string().trim().optional(),
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

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderCreatedDate: undefined,
      orderingStaffId: defaultOrderingStaffId,
      labTestName: '',
      orderingLab: '',
      orderStatus: '',
      labTestCode: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      orderCreatedDate: undefined,
      orderingStaffId: defaultOrderingStaffId,
      labTestName: '',
      orderingLab: '',
      orderStatus: '',
      labTestCode: '',
    })
    fetch(appointmentId, {
      ...defaultPayload,
      ...(appointmentId && appointmentId !== '0'
        ? { appointmentIds: [appointmentId] }
        : {}),
      ...(!isInboxLabOrder ? { patientId: [id] } : {}),
      ...(isInboxLabOrder ? { resourceStatusList: ['Active'] } : {}),
    })
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      orderCreatedDate: formatDateToISOString(data.orderCreatedDate)?.split(
        'T',
      )[0],
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
    fetch(appointmentId, payload)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <OrderDateField />
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
    </FormContainer>
  )
}

export { LabOrdersFilterForm }
