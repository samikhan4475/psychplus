'use client'

import { Grid } from '@radix-ui/themes'
import { AgeInput } from './age-input'
import { CityInput } from './city-input'
import { ContactMadeSelect } from './contact-made-select'
import { CreatedDatePicker } from './created-date-picker'
import { CreditCardVerifySelect } from './credit-card-verify-select'
import { DOBDatePicker } from './dob-date-picker'
import { EmailInput } from './email-input'
import { FirstNameInput } from './first-name-input'
import { GenderSelect } from './gender-select'
import { GuardianSelect } from './guardian-select'
import { InsuranceSelect } from './insurance-select'
import { InsuranceVerifySelect } from './insurance-verify-select'
import { LastNameInput } from './last-name-input'
import { MRNInput } from './mrn-input'
import { NextVisitSelect } from './next-visit-select'
import { NextVisitStatusSelect } from './next-visit-status-select'
import { PastVisitSelect } from './past-visit-select'
import { PastVisitStatusSelect } from './past-visit-status-select'
import { PatientVerifySelect } from './patient-verify-select'
import { PhoneNumberInput } from './phone-number-input'
import { SocialSecurityInput } from './social-security-input'
import { StateSelect } from './state-select'
import { PatientStatusSelect } from './status-select'
import { ZipInput } from './zip-input'

const Filters = () => {
  return (
    <Grid className="col-span-full" columns="4" gap="2" align="baseline">
      <Grid columns="2" gap="2" align="baseline">
        <FirstNameInput />
        <LastNameInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <AgeInput />
        <GenderSelect />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <MRNInput />
        <DOBDatePicker />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <CityInput />
        <ZipInput />
      </Grid>
      <StateSelect />
      <Grid columns="2" gap="2" align="baseline">
        <GuardianSelect />
        <PhoneNumberInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <EmailInput />
        <SocialSecurityInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <PatientStatusSelect />
        <PatientVerifySelect />
      </Grid>
      {/* Todo in Phase 2 <PracticeSelect /> */}
      <InsuranceVerifySelect />
      <CreditCardVerifySelect />
      <CreatedDatePicker />
      <Grid columns="2" gap="2" align="baseline">
        <NextVisitSelect />
        <NextVisitStatusSelect />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <PastVisitSelect />
        <PastVisitStatusSelect />
      </Grid>
      <ContactMadeSelect />
      <InsuranceSelect />
      {/* <OrganizationSelect /> */}
    </Grid>
  )
}

export { Filters }
