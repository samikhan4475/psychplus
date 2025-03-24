'use client'

import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Option } from '@/ui/schedule/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { ClaimListSearchParams } from '../types'
import { ClaimNumberField } from './claim-number-field'
import { ClaimStatusDropDown } from './claim-status-field'
import { DateTypeSelect } from './date-type-select'
import { FromDateField } from './from-date-field'
import { InsuranceSelect } from './insurance-select'
import { LocationSelect } from './location-select'
import { PatientIdField } from './patient-id-field'
import { useStore } from './store'
import { ToDateField } from './to-date-field'

const schema = z.object({
  fromDate: z.custom<DateValue>().nullable(),
  toDate: z.custom<DateValue>().nullable(),
  locationId: z.string().optional(),
  dateType: z.string().optional(),
  claimNumber: z.string().trim().optional(),
  insuranceId: z.string().optional(),
  patientId: z.string().trim().optional(),
  claimStatusCodes: z.array(z.string()).optional(),
})

type SchemaType = z.infer<typeof schema>

const ClaimListFilterForm = () => {
  const { claimsListSearch, claimsListLoading } = useStore((state) => ({
    claimsListSearch: state.claimsListSearch,
    claimsListLoading: state.claimsListLoading,
  }))
  const claimStatuses = useCodesetCodes(CODESETS.ClaimStatus)
  const claimStatusesOptions = useMemo<Option[]>(() => {
    return [
      ...(claimStatuses?.map(({ value, display }) => ({
        value,
        label: display,
      })) ?? []),
    ]
  }, [claimStatuses])

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      locationId: '',
      claimNumber: '',
      insuranceId: '',
      patientId: '',
      dateType: '',
      claimStatusCodes: [],
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      fromDate: null,
      toDate: null,
      locationId: '',
      claimNumber: '',
      insuranceId: '',
      patientId: '',
      dateType: '',
      claimStatusCodes: [],
    })
    return claimsListSearch({})
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      isIncludePatientInsurancePlan: data.insuranceId !== '',
      dateType: data.dateType ? data.dateType : 'DateOfService',
      fromDate: formatDateToISOString(data.fromDate),
      toDate: formatDateToISOString(data.toDate, true),
      claimStatusCodes:
        data.claimStatusCodes?.length === claimStatusesOptions.length
          ? []
          : data.claimStatusCodes, // when user will select all options , no need to pass this property
    }
    const cleanedData = sanitizeFormData(formattedData) as ClaimListSearchParams
    return claimsListSearch(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <ClaimNumberField />
      <PatientIdField />
      <InsuranceSelect />
      <LocationSelect />
      <ClaimStatusDropDown />
      <DateTypeSelect />
      <FromDateField />
      <ToDateField />
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
      <Button highContrast size="1" type="submit" disabled={claimsListLoading}>
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { ClaimListFilterForm, type SchemaType }
