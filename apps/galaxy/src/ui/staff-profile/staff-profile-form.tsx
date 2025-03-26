'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { useStore as useRootStore } from '@/store'
import { getPaddedDateString, sanitizeFormData } from '@/utils'
import { OrganizationOptions } from '../staff-management/types'
import { updateStaffAction } from './actions/update-staff'
import { AgeField } from './age-field'
import { BioField } from './bio-field'
import { BioVideoField } from './bio-video-field'
import { CredentialsSelect } from './credentials-select'
import { transformOut } from './data'
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
import { SupervisedByField } from './supervised-by-fields'
import { TimeZoneSelect } from './time-zone-select'
import { StaffUpdatePayload } from './types'
import { getInitialValues } from './utils'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

interface StaffProfileFormProps {
  googleApiKey: string
  staff: StaffUpdatePayload
  selectOptions: OrganizationOptions
}
const StaffProfileForm = ({
  googleApiKey,
  staff,
  selectOptions,
}: StaffProfileFormProps) => {
  const updateTab = useRootStore((state) => state.updateTab)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(staff),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const finalData = {
      ...data,
      dob: data.dob ? getPaddedDateString(data.dob) : null,
    }
    const sanatizedData = sanitizeFormData(finalData)

    const result = await updateStaffAction({
      staffId: staff.staffId,
      payload: transformOut(sanatizedData),
    })
    if (result.state === 'success') {
      toast.success('Staff Updated Successfully')

      const {
        id,
        legalName: { firstName, lastName },
      } = result.data
      const href = `/staff/${id}/profile`
      const label = `${firstName} ${lastName} - ${id}`
      updateTab({ href, label })
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
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
            <DobField />
            <AgeField />
            <GenderSelect />
          </Grid>
          <Grid columns="6" gap="2">
            <LanguageSelect />
            <EmailField />
            <PhoneField />
            <Box className="col-span-2">
              <VirtualWaitRoomField />
            </Box>
            <Flex className="mb-auto gap-x-2">
              <PasswordField /> <ResetPasswordButton />
            </Flex>
          </Grid>
          <Grid columns="2" gap="2">
            <IndividualNpiField />
            <BioVideoField />
          </Grid>
          <Grid columns="2" gap="2">
            <BioField />
          </Grid>
          <Grid columns="2" gap="2" mt="1">
            <HomeAddressGroup />
            <MailingAddressGroup />
          </Grid>
          <Grid columns="6" gap="2">
            <OrganizationSelect organizations={selectOptions.organizations} />
            <StaffTypeSelect staffs={selectOptions.staffs} />
            <StaffRoleSelect roles={selectOptions.roles} />
            <CredentialsSelect />
            <SupervisedByField />
            <StatusSelect />
          </Grid>
          <Grid columns="6" gap="2">
            <PracticeSelect practices={selectOptions.practices} />
            <ProviderPreferenceSelect />
            <TimeZoneSelect />
          </Grid>
        </Flex>
      </FormContainer>
    </GooglePlacesContextProvider>
  )
}

export { StaffProfileForm }
