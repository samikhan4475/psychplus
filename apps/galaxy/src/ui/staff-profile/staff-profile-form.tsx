'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer, TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { BioField } from './bio-field'
import { CredentialsSelect } from './credentials-select'
import { DobField } from './dob-field'
import { EmailField } from './email-field'
import { FirstNameField } from './first-name-field'
import { GenderSelect } from './gender-select'
import { HomeAddressGroup } from './home-address-group'
import { IndividualNpiField } from './individual-npi-field'
import { LanguageSelect } from './language-select'
import { LastNameField } from './last-name-field'
import { MailingAddressGroup } from './mailing-address-group'
import { MiddleNameField } from './middle-name-field'
import { OrganizationSelect } from './organization-select'
import { PasswordField } from './password-field'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { ResetPasswordButton } from './reset-password-button'
import { SaveStaffButton } from './save-staff-button'
import { schema, SchemaType } from './schema'
import { StaffRoleSelect } from './staff-role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { VirtualWaitRoomField } from './virtual-wait-room-field'
import { getInitialValues } from '../staff-management/utils'


interface StaffProfileFormProps {
  googleApiKey: string
}
const StaffProfileForm = ({ googleApiKey }: StaffProfileFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(),
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // TODO : need api integration here
  }

  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <FormContainer className="bg-white" form={form} onSubmit={onSubmit}>
        <TabContentHeading title="Profile">
          <SaveStaffButton />
        </TabContentHeading>
        <Box className="bg-gray-3 px-3 py-1 text-1 font-medium">
          Personal Info
        </Box>
        <Flex gap="2" direction="column" px="3" py="2">
          <Grid columns="6" gap="2">
            <FirstNameField />
            <MiddleNameField />
            <LastNameField />
            <StaffTypeSelect />
            <StaffRoleSelect />
            <CredentialsSelect />
          </Grid>
          <Grid columns="6" gap="2">
            <OrganizationSelect />
            <PracticeSelect />
            <IndividualNpiField />
            <StatusSelect />
            <DobField />
            <GenderSelect />
          </Grid>
          <Grid columns="6" gap="2">
            <LanguageSelect />
            <ProviderPreferenceSelect />
            <EmailField />
            <PhoneField />
            <Flex className="mb-auto gap-x-2">
              <PasswordField /> <ResetPasswordButton />
            </Flex>
            <VirtualWaitRoomField />
            <Box className="col-span-2">
              <BioField />
            </Box>
          </Grid>
          <Grid columns="2" gap="2" mt="1">
            <HomeAddressGroup />
            <MailingAddressGroup />
          </Grid>
        </Flex>
      </FormContainer>
    </GooglePlacesContextProvider>
  )
}

export { StaffProfileForm }
