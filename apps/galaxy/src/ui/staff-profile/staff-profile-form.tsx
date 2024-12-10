'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { useStore as useRootStore } from '@/store'
import { formatDate, formatDateToISOString, sanitizeFormData } from '@/utils'
import { OrganizationOptions } from '../staff-management/types'
import { updateStaffAction } from './actions/update-staff'
import { BioField } from './bio-field'
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
    const formattedDate = formatDateToISOString(data.dob)
    const finalData = {
      ...data,
      dob: typeof formattedDate === 'string' ? formatDate(formattedDate) : null,
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
            <StaffTypeSelect staffs={selectOptions.staffs} />
            <StaffRoleSelect roles={selectOptions.roles} />
            <CredentialsSelect />
          </Grid>
          <Grid columns="6" gap="2">
            <OrganizationSelect organizations={selectOptions.organizations} />
            <PracticeSelect practices={selectOptions.practices} />
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
