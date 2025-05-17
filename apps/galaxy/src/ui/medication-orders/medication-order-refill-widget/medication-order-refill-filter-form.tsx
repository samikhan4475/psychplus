'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { FromField } from './from-field'
import { MedicationField } from './medication-filed'
import { PatientField } from './patient-filed'
import { PharmacySelect } from './pharmacy-select'
import { PrescriberSelect } from './prescriber-select'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { ToField } from './to-field'
import { MedicationRefillAPIRequest } from './types'

const dateValueToDateOnly = (dateValue: DateValue): Date => {
  const date = new Date(dateValue.toString())
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
const isValidDateRange = (
  from: DateValue | null,
  to: DateValue | null,
): boolean => {
  if (!from || !to) return true
  const fromDate = dateValueToDateOnly(from)
  const toDate = dateValueToDateOnly(to)
  return toDate >= fromDate
}
const schema = z.object({
  notificationDateFrom: z.custom<DateValue>().nullable(),
  notificationDateTo: z.custom<DateValue>().nullable(),
  patientFirstNameContains: z.string().trim().optional(),
  prescriptionId: z.string().optional(),
  pharmacyNcpdpId: z.string().optional(),
  drugDescriptionStartsWith: z.string().trim().optional(),
  notificationResponseType: z.string().optional(),
})

export type MedicationFormFilterSchemaType = z.infer<typeof schema>

const MedicationOrderRefillFilterForm = () => {
  const { searchMedicationsList } = useStore()

  const form = useForm<MedicationFormFilterSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      notificationDateFrom: undefined,
      notificationDateTo: undefined,
      patientFirstNameContains: '',
      prescriptionId: '',
      pharmacyNcpdpId: '',
      drugDescriptionStartsWith: '',
      notificationResponseType: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      notificationDateFrom: undefined,
      notificationDateTo: undefined,
      patientFirstNameContains: '',
      prescriptionId: '',
      pharmacyNcpdpId: '',
      drugDescriptionStartsWith: '',
      notificationResponseType: '',
    })
    searchMedicationsList({})
  }

  const onSubmit: SubmitHandler<MedicationFormFilterSchemaType> = (data) => {
    const isValid = isValidDateRange(
      data.notificationDateFrom,
      data.notificationDateTo,
    )
    if (!isValid) {
      toast.error('To date must be the same or after From date')
      return
    }
    const { notificationResponseType, ...restData } = data
    const formattedData = {
      ...restData,
      notificationDateFrom: formatDateToISOString(data.notificationDateFrom),
      notificationDateTo: formatDateToISOString(data.notificationDateTo, true),
      ...(data.notificationResponseType === 'Pending' && {
        isResponsePending: true,
      }),
      ...(notificationResponseType &&
        !['Pending', 'All'].includes(notificationResponseType) && {
          notificationResponseType,
        }),
    }

    const cleanedData = sanitizeFormData(
      formattedData,
    ) as MedicationRefillAPIRequest
    return searchMedicationsList(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <FromField />
      <ToField />
      <PatientField />
      <PrescriberSelect />
      <PharmacySelect />
      <MedicationField />
      <StatusSelect />
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

export { MedicationOrderRefillFilterForm }
