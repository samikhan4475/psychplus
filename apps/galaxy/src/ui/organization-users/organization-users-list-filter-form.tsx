'use client'

import { FormContainer } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FirstNameField } from './first-name-field'
import { LastNameField } from './last-name-field'
import { AgeField } from './age-field'
import { GenderSelect } from './gender-select'
import { MRNField } from './mrn-field'
import { DOBField } from './dob-field'
import { DateValue } from 'react-aria-components'
import { CityField } from './city-field'
import { ZipField } from './zip-field'
import { StateSelect } from './state-select'
import { GuardianSelect } from './guardian-select'
import { PhoneField } from './phone-field'
import { EmailField } from './email-field'
import { SocialSecurityNumberField } from './social-security-number-field'
import { OrganizationSelect } from './organization-select'
import { PracticeSelect } from './practice-select'
import { PatientStatusSelect } from './patient-status-select'
import { PatientVerifySelect } from './patient-verify-select'
import { InsuranceVerifySelect } from './insurance-verify-select'
import { ConsentVerifySelect } from './consent-verify-select'
import { CreditCardVerifySelect } from './credit-card-verify-select'
import { UserCreationGroup } from './user-creation-group'
import { NextVisitSelect } from './next-visit-select'
import { ContactInitiated } from './contact-initiated-select'
import { PastVisitSelect } from './past-visit-select'
import { InsuranceSelect } from './insurance-select'
import { ClearButton } from './clear-button'
import { FilterToggleButton } from './filter-toggle-button'
import { useStore } from './store'

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  mrn: z.string().optional(),
  dob: z.custom<null | DateValue>(),
  city: z.string().optional(),
  zip: z.string().optional(),
  stateId: z.string().optional(),
  hasGuardian: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  ssn: z.string().optional(),
  patientStatuses: z.string().optional(),
  ptVerify: z.string().optional(),
  inVerify: z.string().optional(),
  consentVerify: z.string().optional(),
  ccVerify: z.string().optional(),
  from: z.custom<null | DateValue>(),
  to: z.custom<null | DateValue>(),
  futureVisitsByDays: z.string().optional(),
  nvStatus: z.string().optional(),
  nvDays: z.string().optional(),
  contactMadeStatus: z.string().optional(),
  pvStatus: z.string().optional(),
  pvDays: z.string().optional(),
  patientInsurancePayerId: z.string().optional(),
  organizationIds: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationUsersListFilterForm = () => {
  const { showFilters } = useStore((state) => ({
    showFilters: state.showFilters,
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
      dob: undefined,
      city: '',
      zip: '',
      stateId: '',
      hasGuardian: '',
      phone: '',
      email: '',
      ssn: '',
      patientStatuses: '',
      ptVerify: '',
      inVerify: '',
      consentVerify: '',
      ccVerify: '',
      from: undefined,
      to: undefined,
      futureVisitsByDays: '',
      nvStatus: '',
      nvDays: '',
      contactMadeStatus: '',
      pvStatus: '',
      pvDays: '',
      patientInsurancePayerId: '',
      organizationIds: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className='bg-white rounded-b-2 rounded-t-1 px-2 py-1 shadow-2 '
    >
      <Flex className="flex-row flex-wrap gap-2">
        {showFilters &&
          (
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
          )
        }
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
