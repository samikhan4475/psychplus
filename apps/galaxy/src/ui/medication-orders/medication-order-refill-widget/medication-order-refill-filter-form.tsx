'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { FromField } from './from-field'
import { ToField } from './to-field'
import { PrescriberSelect } from './prescriber-select'
import { PharmacySelect } from './pharmacy-select'
import { MedicationField } from './medication-filed'
import { PatientField } from './patient-filed'
import { StatusSelect } from './status-select'
import { useStore } from './store'

const schema = z.object({
  orderCreatedDate: z.custom<DateValue | null>().nullable(),
  orderingStaffId: z.string().optional(),
  labTestName: z.string().trim().optional(),
  orderingLab: z.string().optional(),
  orderStatus: z.string().optional(),
  labTestCode: z.string().trim().optional(),
})

export type SchemaType = z.infer<typeof schema>

const MedicationOrderRefillFilterForm = () => {
  const { fetch } = useStore()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderCreatedDate: undefined,
      orderingStaffId: '',
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
      orderingStaffId: '',
      labTestName: '',
      orderingLab: '',
      orderStatus: '',
      labTestCode: '',
    })
    fetch()
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    fetch()
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap md:flex-row flex-col gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <FromField />
      <ToField />
      <PatientField />
      <PrescriberSelect options={[]} />
      <PharmacySelect options={[]} />
      <MedicationField />
      <StatusSelect />

      <div className="flex gap-1 mt-2 md:mt-0">
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
      </div>
    </FormContainer>

  )
}

export { MedicationOrderRefillFilterForm }
