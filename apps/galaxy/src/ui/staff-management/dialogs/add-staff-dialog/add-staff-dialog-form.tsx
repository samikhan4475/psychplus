import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { formatDate, formatDateToISOString, sanitizeFormData } from '@/utils'
import { addStaffAction } from '../../actions/add-staff'
import { useStore } from '../../store'
import { Staff } from '../../types'
import { getInitialValues } from '../../utils'
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
import { schema, SchemaType } from './schema'
import { StaffRoleSelect } from './staff-role-select'
import { StaffSaveButton } from './staff-save-button'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { SupervisedByField } from './supervised-by-field'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

interface AddStaffDialogFormProps {
  handleOpen: (open: boolean) => void
  staff?: Staff
}

const AddStaffDialogForm = ({ handleOpen, staff }: AddStaffDialogFormProps) => {
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    defaultValues: getInitialValues(staff),
  })
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const formattedDate = formatDateToISOString(data.dateOfBirth)
    const finalData = {
      ...data,
      dateOfBirth:
        typeof formattedDate === 'string' ? formatDate(formattedDate) : null,
    }
    const sanatizedData = sanitizeFormData(finalData)

    const result = await addStaffAction(transformOut(sanatizedData))
    if (result.state === 'success') {
      toast.success('Staff Saved Successfully')
      form.reset()
      handleOpen(false)
      search()
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
  }
  return (
    <FormContainer form={form} className="gap-2" onSubmit={onSubmit}>
      <Grid columns="3" gap="2">
        <FirstNameField />
        <MiddleNameField />
        <LastNameField />
      </Grid>
      <Grid columns="3" gap="2">
        <StaffTypeSelect />
        <StaffRoleSelect />
        <CredentialsSelect />
      </Grid>
      <Grid columns="3" gap="2">
        <SupervisedByField />
        <OrganizationSelect />
        <PracticeSelect />
      </Grid>
      <Grid columns="3" gap="2">
        <IndividualNpiField />
        <StatusSelect />
        <DobField />
      </Grid>
      <Grid columns="3" gap="2">
        <GenderSelect />
        <LanguageSelect />
        <ProviderPreferenceSelect />
      </Grid>
      <Grid columns="2" gap="2">
        <EmailField />
        <PhoneField />
      </Grid>
      <Grid columns="2" gap="2" align="baseline">
        <PasswordField />
        <Flex className="mb-auto gap-x-2">
          <ResetPasswordButton /> <VirtualWaitRoomField />
        </Flex>
      </Grid>
      <HomeAddressGroup />
      <MailingAddressGroup />
      <StaffSaveButton />
    </FormContainer>
  )
}

export { AddStaffDialogForm }
