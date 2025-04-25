'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { INVALID_RANGE_ERROR } from '../patient-lookup/constants'
import { validateDate } from '../patient-lookup/utils'
import { AgeField } from './age-field'
import { CityField } from './city-field'
import { ClearButton } from './clear-button'
import { ConsentVerifySelect } from './consent-verify-select'
import { ContactInitiated } from './contact-initiated-select'
import { CreditCardVerifySelect } from './credit-card-verify-select'
import { DOBField } from './dob-field'
import { EmailField } from './email-field'
import { FilterToggleButton } from './filter-toggle-button'
import { FirstNameField } from './first-name-field'
import { GenderSelect } from './gender-select'
import { GuardianSelect } from './guardian-select'
import { InsuranceSelect } from './insurance-select'
import { InsuranceVerifySelect } from './insurance-verify-select'
import { LastNameField } from './last-name-field'
import { MRNField } from './mrn-field'
import { NextVisitSelect } from './next-visit-select'
import { OrganizationSelect } from './organization-select'
import { PastVisitSelect } from './past-visit-select'
import { PatientStatusSelect } from './patient-status-select'
import { PatientVerifySelect } from './patient-verify-select'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { SocialSecurityNumberField } from './social-security-number-field'
import { StateSelect } from './state-select'
import { useStore } from './store'
import { UsersSearchParam } from './types'
import { UserCreationGroup } from './user-creation-group'
import { ZipField } from './zip-field'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/
const phoneRegex = /^(\+?[1-9]\d{9}|^$)$/
const schema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    mrn: z.string().optional(),
    dateOfBirth: z.custom<null | DateValue>(),
    city: z.string().optional(),
    postalCode: z
      .string()
      .trim()
      .regex(zipCodeRegex, 'Invalid zip code!')
      .optional(),
    stateId: z.string().optional(), // Need to add in BE
    hasGuardian: z.string().optional(),
    telephone: z
      .string()
      .trim()
      .regex(phoneRegex, 'Invalid phone number')
      .optional(),
    email: z.string().optional(),
    ssn: z.string().optional(),
    organizations: z.string().optional(),
    practices: z.array(z.string()).optional(),
    patientStatuses: z.array(z.string()).optional(),
    verificationStatuses: z.array(z.string()).optional(),
    insuranceVerificationStatuses: z.array(z.string()).optional(),
    consentVerificationStatuses: z.array(z.string()).optional(),
    creditCardVerificationStatuses: z.array(z.string()).optional(),
    patientCreatedFrom: z.custom<null | DateValue>(),
    patientCreatedTo: z.custom<null | DateValue>(),
    futureVisitsByDays: z.string().optional(),
    nextVisitStatus: z.string().optional(),
    contactMadeStatuses: z.array(z.string()).optional(),
    pastVisitStatus: z.string().optional(),
    visitHistoryPastDays: z.string().optional(),
    insurancePolicyIds: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    const { patientCreatedFrom, patientCreatedTo } = data
    const isStartDateValid = patientCreatedFrom
      ? validateDate(patientCreatedFrom, patientCreatedTo)
      : 0
    const isEndDateValid = patientCreatedTo
      ? validateDate(patientCreatedTo, patientCreatedFrom)
      : 0
    if (isStartDateValid > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['patientCreatedFrom'],
      })
    }

    if (isEndDateValid < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['patientCreatedTo'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

const OrganizationUsersListFilterForm = () => {
  const { id } = useParams<{ id: string }>()
  const { showFilters, search } = useStore((state) => ({
    showFilters: state.showFilters,
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      mrn: '',
      dateOfBirth: undefined,
      city: '',
      postalCode: '',
      stateId: '',
      hasGuardian: '',
      telephone: '',
      email: '',
      ssn: '',
      patientStatuses: [],
      verificationStatuses: [],
      insuranceVerificationStatuses: [],
      consentVerificationStatuses: [],
      creditCardVerificationStatuses: [],
      patientCreatedFrom: undefined,
      patientCreatedTo: undefined,
      futureVisitsByDays: '',
      nextVisitStatus: '',
      contactMadeStatuses: [],
      pastVisitStatus: '',
      visitHistoryPastDays: '',
      insurancePolicyIds: [],
      organizations: '',
      practices: [],
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      organizationIds: [id],
      dateOfBirth: data.dateOfBirth
        ? formatDateToISOString(data.dateOfBirth)
        : '',
      patientCreatedFrom: data.patientCreatedFrom
        ? formatDateToISOString(data.patientCreatedFrom)
        : '',
      patientCreatedTo: data.patientCreatedTo
        ? formatDateToISOString(data.patientCreatedTo)
        : '',
    }
    const cleanedData = sanitizeFormData(formattedData) as UsersSearchParam

    search(cleanedData)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white rounded-b-2 rounded-t-1 px-2 py-1 shadow-2 "
    >
      <Flex className="flex-row flex-wrap gap-2">
        {showFilters && (
          <>
            <FirstNameField />
            <LastNameField />
            <AgeField />
            <GenderSelect />
            <MRNField />
            <DOBField />
            <CityField />
            <ZipField />
            <StateSelect />
            <GuardianSelect />
            <PhoneField />
            <EmailField />
            <SocialSecurityNumberField />
            <OrganizationSelect />
            <PracticeSelect />
            <PatientStatusSelect />
            <PatientVerifySelect />
            <InsuranceVerifySelect />
            <ConsentVerifySelect />
            <CreditCardVerifySelect />
            <UserCreationGroup />
            <NextVisitSelect />
            <ContactInitiated />
            <PastVisitSelect />
            <InsuranceSelect />
          </>
        )}
      </Flex>

      <Flex className="flex-row gap-1.5" justify="end" align="center">
        <FilterToggleButton />
        <ClearButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { OrganizationUsersListFilterForm, type SchemaType }
