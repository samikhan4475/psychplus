'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { AgeInput } from './age-input'
import { CityInput } from './city-input'
import { ContactMadeSelect } from './contact-made-select'
import { DOBDatePicker } from './dob-date-picker'
import { EmailInput } from './email-input'
import { FromDatePicker } from './from-date-picker'
import { GenderSelect } from './gender-select'
import { InitiatedBySelect } from './initiated-by-select'
import { MRNInput } from './mrn-input'
import { NextVisitSelect } from './next-visit-select'
import { PhoneNumberInput } from './phone-number-input'
import { PrimaryInsuranceSelect } from './primary-insurance-select'
import { ProviderSelect } from './provider-select'
import { PtNameInput } from './pt-name-input'
import { PtStatusSelect } from './pt-status-select'
import { ReferralStatusSelect } from './referral-status-select'
import { SecondaryInsuranceSelect } from './secondary-insurance-select'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-select'
import { StateInput } from './state-input'
import { ToDatePicker } from './to-date-picker'
import { VisitHxSelect } from './visit-hx-select'
import { VisitIdInput } from './visit-id-input'
import { ZipInput } from './zip-input'

// import { PracticeSelect } from './practice-select'
// import { OrganizationSelect } from './organization-select'

interface FiltersProps {
  options: SelectOptionType[]
}

const Filters = ({ options }: FiltersProps) => {
  return (
    <Grid className="col-span-full" columns="4" gap="2" align="baseline">
      <PtNameInput />
      <Grid columns="2" gap="2" align="baseline">
        <PtStatusSelect />
        <AgeInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <GenderSelect />
        <MRNInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <DOBDatePicker />
        <PhoneNumberInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <EmailInput />
        <StateInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <CityInput />
        <ZipInput />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <PrimaryInsuranceSelect />
        <SecondaryInsuranceSelect />
      </Grid>
      <ServiceSelect />
      <Grid columns="2" gap="2" align="baseline">
        <FromDatePicker />
        <ToDatePicker />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <VisitIdInput />
        <ServiceStatusSelect />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <InitiatedBySelect />
        <ProviderSelect options={options} />
      </Grid>
      {/* will implement later */}
      {/* <Grid columns="2" gap="2" align="baseline">
        <PracticeSelect />
      <OrganizationSelect />
      </Grid> */}
      <Grid columns="2" gap="2" align="baseline">
        <ContactMadeSelect />
        <ReferralStatusSelect />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <NextVisitSelect />
        <VisitHxSelect />
      </Grid>
    </Grid>
  )
}

export { Filters }
