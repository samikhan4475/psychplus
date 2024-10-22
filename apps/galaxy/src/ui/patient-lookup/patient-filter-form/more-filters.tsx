'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { CityInput } from './city-input'
import { ClearButton } from './clear-button'
import { ConsentVerifySelect } from './consent-verify-select'
import { ContactMadeSelect } from './contact-made-select'
import { CreatedDatePicker } from './created-date-picker'
import { CreditCardVerifySelect } from './credit-card-verify-select'
import { EmailInput } from './email-input'
import { GuardianSelect } from './guardian-select'
import { InsuranceSelect } from './insurance-select'
import { InsuranceVerifySelect } from './insurance-verify-select'
import { NextVisitSelect } from './next-visit-select'
import { NextVisitStatusSelect } from './next-visit-status-select'
import { OrganizationSelect } from './organization-select'
import { PastVisitSelect } from './past-visit-select'
import { PastVisitStatusSelect } from './past-visit-status-select'
import { PatientVerifySelect } from './patient-verify-select'
import { PhoneNumberInput } from './phone-number-input'
import { PracticeSelect } from './practice-select'
import { SocialSecurityInput } from './social-security-input'
import { PatientStatusSelect } from './status-select'
import { SubmitButton } from './submit-button'
import { ZipInput } from './zip-input'

interface MoreFiltersProps {
  practicesOptions: SelectOptionType[]
}

const MoreFilters = ({
  practicesOptions,
}: MoreFiltersProps) => {
  return (
    <Grid className="col-span-full" columns="4" gap="2" align="baseline">
      <Grid columns="2" gap="2" align="baseline">
        <CityInput />
        <ZipInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <GuardianSelect />
        <PhoneNumberInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <EmailInput />
        <SocialSecurityInput />
      </Grid>
      <PracticeSelect practicesOptions={practicesOptions} />
      <Grid columns="2" gap="2" align="baseline">
        <PatientStatusSelect />
        <PatientVerifySelect />
      </Grid>
      <InsuranceVerifySelect />
      <ConsentVerifySelect />
      <CreditCardVerifySelect />
      <CreatedDatePicker />
      <Grid columns="2" gap="2" align="baseline">
        <NextVisitSelect />
        <NextVisitStatusSelect />
      </Grid>
      <ContactMadeSelect />
      <InsuranceSelect />
      <Grid columns="2" gap="2" align="baseline">
        <PastVisitSelect />
        <PastVisitStatusSelect />
      </Grid>
      <OrganizationSelect />
      <Flex className="col-span-2" justify="end" gap="2">
        <ClearButton />
        <SubmitButton />
      </Flex>
    </Grid>
  )
}

export { MoreFilters }
