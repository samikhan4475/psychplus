import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FormContainer } from '@/components'
import { updatePracticeAction } from '@/ui/organization-practices/actions'
import { sanitizeFormData } from '@/utils'
import { addOrganizationPracticeAction } from '../../actions'
import { Organization, Practice } from '../../types'
import { CliaField } from './clia-field'
import { DefProviderField } from './def-provider-field'
import { defaultValues } from './default-values'
import { FaxField } from './fax-field'
import { NameField } from './name-field'
import { NpiField } from './npi-field'
import { OrganizationSelect } from './organization-select'
import { PayerAddressFields } from './payer-address-fields'
import { PhoneField } from './phone-field'
import { PrimaryAddressFields } from './primary-address-fields'
import { schema, type SchemaType } from './schema'
import { StatusSelect } from './status-select'
import { SubmitFormButton } from './submit-form-button'
import { TaxonomyCodeField } from './taxonomy-code-field'
import { TinField } from './tin-field'

interface FormProps {
  data: Organization
  practiceData?: Practice
  onCloseModal: (open: boolean) => void
  refetch?: () => void
}

const PracticeForm = ({
  data,
  onCloseModal,
  practiceData,
  refetch,
}: FormProps) => {
  const newData = {
    ...data,
    practiceAddress: data.organizationAddress,
    organizationId: data.id,
  }
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(newData),
  })

  const onSave = async (formData: SchemaType) => {
    if (!data) {
      return
    }
    const requestPayload: Partial<Practice> = {
      ...formData,
      shortName: formData.displayName,
      practiceAddress: {
        street1: formData.address1,
        street2: formData.address2 ?? '',
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        zipLast4: formData.zipLast4,
        type: 'Business',
      },
      practicePaymentAddress: {
        street1: formData.practicePaymentAddress.street1 ?? '',
        street2: formData.practicePaymentAddress.street2 ?? '',
        city: formData.practicePaymentAddress.city,
        state: formData.practicePaymentAddress.state,
        postalCode: formData.practicePaymentAddress.postalCode,
        zipLast4: formData.practicePaymentAddress.zipLast4,
        type: 'Business',
      },
    }

    const sanitizedPayload = sanitizeFormData(requestPayload)
    const response = practiceData
      ? await updatePracticeAction(sanitizedPayload, data.id, practiceData?.id)
      : await addOrganizationPracticeAction(data.id, sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      refetch && refetch()
    } else {
      toast.error('Unable to save record')
    }
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-8">
            <NameField />
          </Box>
          <Box className="col-span-2">
            <NpiField />
          </Box>
          <Box className="col-span-2">
            <TinField />
          </Box>
        </Grid>

        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-3">
            <TaxonomyCodeField />
          </Box>
          <Box className="col-span-3">
            <CliaField />
          </Box>
          <Box className="col-span-6">
            <OrganizationSelect organizationId={data.id} />
          </Box>
        </Grid>

        <Grid columns="4" className="col-span-full gap-3">
          <PhoneField />
          <FaxField />
          <DefProviderField />
          <StatusSelect />
        </Grid>
        <PrimaryAddressFields organizationAddress={data.organizationAddress} />
        <PayerAddressFields />
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { PracticeForm, type SchemaType }
