import React from 'react'
import { Grid } from '@radix-ui/themes'
import { DobField } from './dob-field'
import { EmailField } from './email-field'
import { FirstNameField } from './first-name-field'
import { GenderSelect } from './gender-select'
import { IndividualNpiField } from './individual-npi-field'
import { LanguageSelect } from './language-select'
import { LastNameField } from './last-name-field'
import { OrganizationSelect } from './organization-select'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { StaffRoleSelect } from './role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'

const Filters = () => {
  return (
    <>
      <Grid className="col-span-full" columns="6" gap="2" align="baseline">
        <FirstNameField />
        <LastNameField />
        <StaffTypeSelect />
        <StaffRoleSelect />
        <OrganizationSelect />
        <PracticeSelect />
      </Grid>
      <Grid className="col-span-full" columns="6" gap="2" align="baseline">
        <ProviderPreferenceSelect />
        <EmailField />
        <PhoneField />
        <IndividualNpiField />
        <StatusSelect />
        <DobField />
        <GenderSelect />
        <LanguageSelect />
      </Grid>
    </>
  )
}

export { Filters }
