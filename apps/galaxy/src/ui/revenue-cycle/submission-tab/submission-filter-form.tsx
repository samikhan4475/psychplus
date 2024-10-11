'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { ClaimNumberInput } from './claim-number-input'
import { DateFromInput } from './date-from-input'
import { DateToInput } from './date-to-input'
import { DateTypeSelect } from './date-type-select'
import { InsuranceNameSelect } from './insurance-name-select'
import { InsuranceTypeSelect } from './insurance-type-select'
import { LocationSelect } from './location-select'
import { PatientInput } from './patient-input'
import { useStore } from './store'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { DateValue } from '@internationalized/date'
import { ClearFilterFormButton } from './clear-filter-form-button'
const schema = z.object({
    insuranceType: z.string().optional(),
    isIncludeClaimValidation: z.boolean(),
    isIncludePatientInsurancePlan: z.boolean(),
    isIncludePatientInsurancePolicy: z.boolean(),
    locationId: z.string().trim().optional(),
    dateType: z.string().trim().optional(),
    claimNumber: z.string().trim().optional(),
    insuranceId: z.string().trim().optional(),
    patientId: z.string().trim().optional(),
    fromDate: z.custom<DateValue | string>().nullable(),
    toDate: z.custom<DateValue | string>().nullable(),
})
type SchemaType = z.infer<typeof schema>
const FilterForm = () => {
    const { error, search } = useStore((state) => ({
        error: state.error,
        search: state.search
    }))
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        reValidateMode: 'onChange',
        defaultValues: {
            locationId: '',
            dateType: '',
            claimNumber: '',
            insuranceId: '',
            patientId: '',
            insuranceType: '',
            isIncludeClaimValidation: true,
            isIncludePatientInsurancePlan: false,
            isIncludePatientInsurancePolicy: true,
        },
    })
    const onSubmit: SubmitHandler<SchemaType> = (data) => {
        const formattedData = {
            ...data,
            fromDate: formatDateToISOString(data.fromDate as DateValue),
            toDate: formatDateToISOString(data.toDate as DateValue),
        }
        const sanitizedData = sanitizeFormData(formattedData)
        return search(sanitizedData, 1, true)
    }
    return (
        <>
            <FormError message={error} />
            <FormContainer className='bg-white flex-row my-2 px-2 gap-1.5 rounded-b-2 rounded-t-1 py-1 shadow-2 flex-wrap' form={form} onSubmit={onSubmit}>
                <ClaimNumberInput />
                <PatientInput />
                <InsuranceNameSelect />
                <LocationSelect />
                <InsuranceTypeSelect />
                <DateTypeSelect />
                <DateFromInput />
                <DateToInput />
                <ClearFilterFormButton />
                <Button highContrast size="1" type="submit">
                    <MagnifyingGlassIcon strokeWidth={2} />
                </Button>
            </FormContainer>
        </>
    )
}
export { FilterForm, type SchemaType }
