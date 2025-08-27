'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { STAFF_PROFILE_IMAGE_ENDPOINT } from '@/api/endpoints'
import { FormContainer, TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { useStore as useRootStore } from '@/store'
import { OrganizationOptions } from '../staff-management/types'
import { updateStaffAction } from './actions/update-staff'
import { updateStaffProfileImageAction } from './actions/update-staff-profile-image'
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
import { PhoneField } from './phone-field'
import { ProfilePicture } from './profile-picture'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { ResetButton } from './reset-button'
import { SaveStaffButton } from './save-staff-button'
import { schema, SchemaType } from './schema'
import { StaffRoleSelect } from './staff-role-select'
import { SubRoleSelect } from './staff-type-select'
import { RoleSelect } from './user-type-select'
import { ScopeSelect } from './scope-select'
import { StatusSelect } from './status-select'
import { SupervisedByField } from './supervised-by-fields'
import { TestStaffCheckbox } from './test-staff-checkbox'
import { TimeZoneSelect } from './time-zone-select'
import { StaffUpdatePayload } from './types'
import { getInitialValues } from './utils'
import { VideoCallLinkInput } from './video-call-link-input'
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
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    defaultValues: getInitialValues(staff),
  })
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const result = await updateStaffAction({
      staffId: staff.staffId,
      payload: transformOut(data),
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
      if (profileImage) {
        const formData = new FormData()
        formData.append('file', profileImage)

        const uploadResult = await updateStaffProfileImageAction({
          data: formData,
          staffId: Number(id),
        })

        if (uploadResult.state === 'error') {
          toast.error(
            uploadResult.error ?? 'Failed to upload profile image. Try again.',
          )
          return
        }
      }
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
  }

  const savedProfileImageUrl = form.watch('hasPhoto')
    ? STAFF_PROFILE_IMAGE_ENDPOINT(Number(staff.staffId))
    : ''
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <FormContainer className="bg-white" form={form} onSubmit={onSubmit}>
        <TabContentHeading title="Profile">
          <Flex align="center" gap="2">
            <ResetButton />
            <TestStaffCheckbox />
            <SaveStaffButton />
          </Flex>
        </TabContentHeading>

        <Box className="bg-gray-3 px-3 py-1 text-1 font-medium">
          Personal Info
        </Box>

        <Box px="3" py="2">
          <Grid columns="7" gap="4">
            <Box className="col-span-1 flex flex-col items-center">
              <ProfilePicture
                setProfileImage={setProfileImage}
                savedProfileImageUrl={savedProfileImageUrl}
              />
            </Box>

            <Box className="col-span-6">
              <Grid columns="6" gap="2">
                <FirstNameField />
                <MiddleNameField />
                <LanguageSelect />
                <EmailField />
                <IndividualNpiField />
                <BioVideoField />
                <LastNameField />
                <DobField />
                <AgeField />
                <GenderSelect />
                <PhoneField />
                <VirtualWaitRoomField />
              </Grid>
              <Grid columns="12" gap="2">
                <Box className="col-span-6">
                  <VideoCallLinkInput />
                </Box>
                <Box className="col-span-6">
                  <BioField />
                </Box>
              </Grid>
            </Box>

            

            <Box className="col-span-7">
              <Grid columns="2" gap="2">
                <HomeAddressGroup />
                <MailingAddressGroup />
              </Grid>
            </Box>

            <Box className="col-span-7">
              <Grid columns="6" gap="2">
                <OrganizationSelect
                  organizations={selectOptions.organizations}
                />
                <StaffRoleSelect roles={selectOptions.roles} />
                <RoleSelect userActorCategory={form.watch('userActorCategory')} />
                <SubRoleSelect specialtyCodes={form.watch('specialtyCodes') || ''} />
                <CredentialsSelect />
                <ScopeSelect />
                <SupervisedByField />
                <StatusSelect />
              </Grid>
            </Box>

            <Box className="col-span-7">
              <Grid columns="6" gap="2">
                <ProviderPreferenceSelect />
                <TimeZoneSelect />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </FormContainer>
    </GooglePlacesContextProvider>
  )
}

export { StaffProfileForm }
