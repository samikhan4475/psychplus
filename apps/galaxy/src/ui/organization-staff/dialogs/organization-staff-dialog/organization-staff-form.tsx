import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { Staff } from '../../types'
import { AddressFields } from './address-fields'
import { CredentialsSelect } from './credentials-select'
import { defaultValues } from './default-values'
import { DobDateField } from './dob-date-field'
import { EmailField } from './email-field'
import { FirstNameField } from './first-name-field'
import { GenderSelect } from './gender-select'
import { IndividualNpiField } from './individual-npi-field'
import { LanguageSelect } from './language-select'
import { LastNameField } from './last-name-field'
import { MailingAddressFields } from './mailing-address-fields'
import { MiddleNameField } from './middle-name-field'
import { OrganizationSelect } from './organization-select'
import { PasswordField } from './password-field'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { schema, type SchemaType } from './schema'
import { StatusSelect } from './status-select'
import { SubmitFormButton } from './submit-form-button'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

interface FormProps {
  data?: Staff
  onCloseModal: (open: boolean) => void
}

const OrganizationStaffForm = ({ data, onCloseModal }: FormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data), // TODO: Add default values
  })

  const onSave = async (formData: SchemaType) => {
    // TODO: Add logic for saving the data
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="4" className="mb-2 mt-2 gap-3">
          <FirstNameField />
          <MiddleNameField />
          <LastNameField />
          <CredentialsSelect />
        </Grid>

        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <OrganizationSelect />
          <PracticeSelect />
        </Grid>
        <Grid columns="3" className="mb-2 mt-2 gap-3">
          <IndividualNpiField />
          <StatusSelect />
          <DobDateField />
        </Grid>

        <Grid columns="3" className="mb-2 mt-2 gap-3">
          <GenderSelect />
          <LanguageSelect />
          <ProviderPreferenceSelect />
        </Grid>

        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <EmailField />
          <PhoneField />
        </Grid>

        <Grid columns="10" className="mb-2 mt-2 gap-3">
          <Box className="col-span-7">
            <PasswordField />
          </Box>
          <Box className="col-span-3">
            <VirtualWaitRoomField />
          </Box>
        </Grid>

        <AddressFields />
        <MailingAddressFields />
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { OrganizationStaffForm, type SchemaType }
