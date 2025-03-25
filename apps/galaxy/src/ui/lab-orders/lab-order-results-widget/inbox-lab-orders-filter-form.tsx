'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { CptCodeField } from '../lab-orders-widget/cpt-code-field'
import { useStore } from './store'
import { TestField } from '../lab-orders-widget/test-field'
import { OrderToDateField } from './order-to-date-field'
import { OrderFromDateField } from './order-from-date-field'
import { PatientField } from './patient-field'
import { StatusSelectFilter } from './status-select-filter'
import { OrderStatus } from './types'
import { OrderBySelect } from '../lab-orders-widget/order-by-select'
import { IsReviewedField } from './is-reviewed-field'
import { Flex } from '@radix-ui/themes'

const schema = z.object({
  orderCreatedFromDate: z.custom<DateValue | null>().nullable(),
  orderCreatedToDate: z.custom<DateValue | null>().nullable(),
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

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderCreatedFromDate: undefined,
      orderCreatedToDate: undefined,
      labTestName: '',
      orderingLab: '',
      orderStatus: '',
      labTestCode: '',
      patientName: '',
      orderingStaffId: '',
      isResultSigned: false
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      orderCreatedFromDate: undefined,
      orderCreatedToDate: undefined,
      labTestName: '',
      orderingLab: '',
      orderStatus: '',
      labTestCode: '',
      patientName: '',
      orderingStaffId: '',
      isResultSigned: false
    })
    const payload = {
      orderStatus: OrderStatus.ResultReceived,
      isIncludePatient: true,
      isResultSigned: false
    };
    fetchLabOrderResults(payload)
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      orderCreatedFromDate: formatDateToISOString(data.orderCreatedFromDate)?.split(
        'T',
      )[0],
      orderCreatedToDate: formatDateToISOString(data.orderCreatedToDate)?.split(
        'T',
      )[0]
    }
    const sanitizedData = sanitizeFormData(formattedData)
    const payload = {
      ...sanitizedData,
      isIncludePatient: true,
      isResultSigned: data.isResultSigned
    }
    fetchLabOrderResults(payload)
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
        <CptCodeField />
        <StatusSelectFilter />
        <IsReviewedField />
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
