'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { FiltersToggleButton } from './filters-toggle-button'
import { AgeInput } from './filters/age-input'
import { CityField } from './filters/city-field'
import { DobInput } from './filters/dob-input'
import { DocumentsSelect } from './filters/documents-select'
import { EmailInput } from './filters/email-input'
import { EndDateInput } from './filters/end-date-input'
import { FaceSheetSelect } from './filters/facesheet-select'
import { FirstNameField } from './filters/first-name-field'
import { StartDateInput } from './filters/from-date-input'
import { GenderSelect } from './filters/gender-select'
import { GuardianSelect } from './filters/guardian-select'
import { InsuranceSelect } from './filters/insurance-select'
import { LastNameField } from './filters/last-name-field'
import { LegalSelect } from './filters/legal-select'
import { LinkedSelect } from './filters/linked-select'
import { MRNInput } from './filters/mrn-input'
import { PhoneInput } from './filters/phone-input'
import { ServiceDropdown } from './filters/service-select'
import { ServiceMultiSelect } from './filters/service-status-select'
import { TimeElapsedInput } from './filters/time-elapsed-input'
import { ZipInput } from './filters/zip-input'
import { useStore } from './store'
import { PatientTransferPayload } from './types'

const schema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  age: z.coerce.number().positive('Invalid age').optional().nullable(),
  gender: z.string().trim().optional(),
  mrn: z
    .string()
    .trim()
    .max(35, { message: 'Cannot exceed 35 characters' })
    .optional(),
  dateOfBirth: z.custom<DateValue>().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  hasGuardian: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  service: z.array(z.string()),
  fromDate: z.custom<DateValue | null>().optional(),
  endDate: z.custom<DateValue | null>().optional(),
  serviceStatus: z.array(z.string()),
  insurance: z.string().optional(),
  legal: z.string().optional(),
  linked: z.string().optional(),
  facesheet: z.string().optional(),
  documents: z.string().optional(),
  timeElapsed: z.custom<DateValue | null>().optional(),
})

type PatientTransferSchemaType = z.infer<typeof schema>

const PatientHistoryFilterForm = () => {
  const { search, showFilters } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<PatientTransferSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
      gender: '',
      mrn: '',
      dateOfBirth: undefined,
      city: '',
      zip: '',
      hasGuardian: '',
      phone: '',
      email: '',
      service: [],
      fromDate: null,
      endDate: null,
      serviceStatus: [],
      insurance: '',
      legal: '',
      linked: '',
      facesheet: '',
      documents: '',
      timeElapsed: null,
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    return search({})
  }

  const onSubmit: SubmitHandler<PatientTransferSchemaType> = (data) => {
    const sanitizedData = sanitizeFormData({
      ...data,
    }) as PatientTransferPayload
    search(sanitizedData, 1, true)
  }

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap justify-between gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex className="flex-row flex-wrap gap-2">
        <FirstNameField />
        <LastNameField />
        <AgeInput />
        <GenderSelect />
        <MRNInput />
        <DobInput />
        {showFilters && (
          <Flex className=" flex-row  flex-wrap gap-2">
            <CityField />
            <ZipInput />
            <GuardianSelect />
            <PhoneInput />
            <EmailInput />
            <ServiceDropdown />
            <StartDateInput disabled={false} />
            <EndDateInput disabled={false} />
            <ServiceMultiSelect />
            <InsuranceSelect />
            <LegalSelect />
            <LinkedSelect />
            <FaceSheetSelect />
            <DocumentsSelect />
            <TimeElapsedInput />
          </Flex>
        )}
      </Flex>
      <Flex className=" ml-auto items-center gap-1 ">
        <FiltersToggleButton />
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

export { PatientHistoryFilterForm, type PatientTransferSchemaType }
