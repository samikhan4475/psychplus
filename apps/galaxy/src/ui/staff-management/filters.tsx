import React from 'react'
import { Grid } from '@radix-ui/themes'
import { CredentialsSelect } from './credentials-select'
import { DobField } from './dob-field'
import { EmailField } from './email-field'
import { FirstNameField } from './first-name-field'
import { GenderSelect } from './gender-select'
import { HomeAddressField } from './home-address-field'
import { IndividualNpiField } from './individual-npi-field'
import { LanguageSelect } from './language-select'
import { LastNameField } from './last-name-field'
import { OrganizationSelect } from './organization-select'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { RoleSelect } from './role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { SupervisedBySelect } from './supervisedby-select'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

const Filters = () => {
  return (
    <>
      <Grid className="col-span-full" columns="6" gap="2" align="baseline">
        <FirstNameField />
        <LastNameField />
        <StaffTypeSelect />
        <RoleSelect />
        <CredentialsSelect />
        <SupervisedBySelect />
      </Grid>
      <Grid className="col-span-full" columns="7" gap="2" align="baseline">
        <OrganizationSelect />
        <PracticeSelect />
        <IndividualNpiField />
        <StatusSelect />
        <DobField />
        <GenderSelect />
        <LanguageSelect />
      </Grid>
      <Grid className="col-span-full" columns="5" gap="2" align="baseline">
        <ProviderPreferenceSelect />
        <EmailField />
        <PhoneField />
        <VirtualWaitRoomField />
        <HomeAddressField />
      </Grid>
    </>
  )
}

export { Filters }
