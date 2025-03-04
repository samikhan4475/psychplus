import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { PatientAddress } from '@/types'
import { formatDate, sanitizeFormData } from '@/utils'
import { addStaffAction, updateStaffAction } from '../../actions'
import { useStore } from '../../store'
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
import { StaffRoleSelect } from './staff-role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { SubmitFormButton } from './submit-form-button'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

interface FormProps {
  data?: Staff
  onCloseModal: (open: boolean) => void
}

const OrganizationStaffForm = ({ data, onCloseModal }: FormProps) => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data, id),
  })

  const onSave = async (formData: SchemaType) => {
    const addresses: PatientAddress[] = [
      {
        type: 'Home',
        street1: formData.address1,
        street2: formData.address2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
      },
    ]

    addresses.push({
      type: 'Mailing',
      street1: formData.mailing.street1,
      street2: formData.mailing.street2,
      city: formData.mailing.city,
      state: formData.mailing.state,
      postalCode: formData.mailing.postalCode,
    })

    let reqPayload: Partial<Staff> = {
      ...formData,
      legalName: {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        honors: formData.credentials,
      },
      dateOfBirth: formData.dateOfBirth
        ? formatDate(formData.dateOfBirth.toString())
        : '',
      contactInfo: {
        email: formData.email,
        phoneNumbers: [
          {
            type: 'Home',
            number: formData.phone,
          },
        ],
        addresses: addresses,
        isMailingAddressSameAsPrimary:
          formData.isMailingAddressSameAsHome === 'yes',
      },
      preferredLanguage: formData.language[0],
      staffUserRoleIds: [formData.staffUserRoleIds],
    }

    if (data) {
      reqPayload = {
        staffId: Number(data?.id),
        userId: data.userId,
        staffRoleId: formData.staffRoleId,
        status: formData.status,
        staffUserRoleIds: [formData.staffUserRoleIds],
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dateOfBirth
          ? formatDate(formData.dateOfBirth.toString())
          : '',
        middleName: formData.middleName,
        address: formData.address1,
        address2: formData.address2,
        country: '',
        stateCode: formData.state,
        city: formData.city,
        postalCode: formData.zip,
        secondaryAddress: formData.mailing.street1,
        secondaryAddress2: formData.mailing.street2,
        secondaryCountry: '',
        secondaryStateCode: formData.mailing.state,
        secondaryCity: formData.mailing.city,
        secondaryPostalCode: formData.mailing.postalCode,
        spokenLanguages: formData.language,
        virtualRoomLink: formData.virtualRoomLink,
        biography: data.bio,
        title: formData.credentials,
        npi: formData.npi,
        gender: formData.gender,
        email: formData.email,
        phoneContact: formData.phone,
        supervisedBy: data.supervisedBy,
        supervisorStaffId: data.supervisorStaffId,
        providerAttributions: formData.providerAttributions,
        organizationIds: formData.organizationIds,
        practiceIds: formData.practiceIds,
        isMailingAddressSameAsPrimary:
          formData.isMailingAddressSameAsHome === 'yes',
      }
      delete reqPayload.password
    } else {
      reqPayload = {
        ...reqPayload,
      }
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)

    const response = data
      ? await updateStaffAction(sanitizedPayload, data?.id)
      : await addStaffAction(sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      search({
        organizationsIds: [id],
      })
    } else {
      toast.error('Unable to save record')
    }
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
        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <StaffTypeSelect />
          <StaffRoleSelect />
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
