'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { STAFF_PROFILE_IMAGE_ENDPOINT } from '@/api/endpoints'
import { CheckboxInput, FormContainer } from '@/components'
import { updateStaffProfileImageAction } from '@/ui/staff-profile/actions/update-staff-profile-image'
import { ProfilePicture } from '@/ui/staff-profile/profile-picture'
import { handleUploadBioVideo } from '@/ui/staff-profile/utils'
import { addStaffAction } from '../../actions/add-staff'
import { FEATURE_TYPES } from '../../constants'
import { useStore } from '../../store'
import { getInitialValues } from '../../utils'
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
import { schema, SchemaType } from './schema'
import { StaffRoleSelect } from './staff-role-select'
import { StaffSaveButton } from './staff-save-button'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { SupervisedByField } from './supervised-by-field'
import { TimeZoneSelect } from './time-zone-select'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

interface AddStaffDialogFormProps {
  onClose: (open: boolean) => void
}

const AddStaffDialogForm = ({ onClose }: AddStaffDialogFormProps) => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const search = useStore((state) => state.search)
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getInitialValues(id, type),
  })
  const onSubmit: SubmitHandler<SchemaType> = async ({ bioVideo, ...data }) => {
    const result = await addStaffAction(transformOut(data))

    if (result.state === 'error') {
      return toast.error(result.error)
    }
    if (bioVideo && result.data.id) {
      await handleUploadBioVideo(bioVideo, result.data.id, false)
    }
    if (profileImage && result.data.id) {
      const formData = new FormData()
      formData.append('file', profileImage)

      const uploadResult = await updateStaffProfileImageAction({
        data: formData,
        staffId: Number(result.data.id),
      })

      if (uploadResult.state === 'error') {
        toast.error(
          uploadResult.error ?? 'Failed to upload profile image. Try again.',
        )
        return
      }
    }
    toast.success('Staff Saved Successfully')
    form.reset()
    onClose(false)
    search({
      organizationsIds: type === FEATURE_TYPES.ORGANIZATION ? [id] : [],
      practicesIds: type === FEATURE_TYPES.PRACTICE ? [id] : [],
    })
  }

  const savedProfileImageUrl = form.watch('hasPhoto')
    ? STAFF_PROFILE_IMAGE_ENDPOINT(Number(form.watch('staffId')))
    : ''
  return (
    <FormContainer form={form} className="gap-2" onSubmit={onSubmit}>
      <Flex justify="end">
        <CheckboxInput label="Add as test provider" field="isTest" />
      </Flex>
      <Grid columns="12" gap="4">
        <Box className="col-span-3 flex flex-col items-center">
          <ProfilePicture
            setProfileImage={setProfileImage}
            savedProfileImageUrl={savedProfileImageUrl}
          />
        </Box>

        <Box className="col-span-9 p-5">
          <Grid columns="3" gap="2">
            <FirstNameField />
            <MiddleNameField />
            <LastNameField />
            <DobField />
            <AgeField />
            <GenderSelect />
            <LanguageSelect />
            <EmailField />
            <PhoneField />
          </Grid>
        </Box>
      </Grid>

      <Grid columns="3" gap="2">
        <VirtualWaitRoomField />
        <PasswordField />
      </Grid>
      <Grid columns="2" gap="2">
        <IndividualNpiField />
        <BioVideoField />
      </Grid>
      <BioField />
      <HomeAddressGroup />
      <MailingAddressGroup />
      <Grid columns="3" gap="2" align="baseline">
        <OrganizationSelect />
        <StaffRoleSelect />
        <StaffTypeSelect />
        <CredentialsSelect />
        <SupervisedByField />
        <StatusSelect />
        <TimeZoneSelect />
        <PracticeSelect />
      </Grid>
      <StaffSaveButton />
    </FormContainer>
  )
}

export { AddStaffDialogForm }
