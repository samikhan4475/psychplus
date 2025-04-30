'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CheckboxInput, FormContainer } from '@/components'
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
    toast.success('Staff Saved Successfully')
    form.reset()
    onClose(false)
    search({
      organizationsIds: type === FEATURE_TYPES.ORGANIZATION ? [id] : [],
      practicesIds: type === FEATURE_TYPES.PRACTICE ? [id] : [],
    })
  }
  return (
    <FormContainer form={form} className="gap-2" onSubmit={onSubmit}>
      <Flex justify="end">
        <CheckboxInput label="Add as test provider" field="isTest" />
      </Flex>
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
