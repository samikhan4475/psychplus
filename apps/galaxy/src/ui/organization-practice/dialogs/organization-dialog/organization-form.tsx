import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { Organization } from '../../types'
import { AddressFields } from './address-fields'
import { ContactNameField } from './contact-name-field'
import { defaultValues } from './default-values'
import { EmailField } from './email-field'
import { NameField } from './name-field'
import { PhoneField } from './phone-field'
import { schema, type SchemaType } from './schema'
import { StatusSelect } from './status-select'
import { SubmitFormButton } from './submit-form-button'

interface FormProps {
  data?: Organization
  onCloseModal: (open: boolean) => void
}

const OrganizationForm = ({ data, onCloseModal }: FormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data),
  })

  const onSave = async (formData: SchemaType) => {
    // TODO: Add logic for saving the data
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-12">
            <NameField />
          </Box>
        </Grid>

        <Box className="pb-1 pt-1">
          <Text size="2" className="pb-1 text-[14px]" weight="medium">
            Contact
          </Text>
        </Box>

        <Grid columns="4" className="col-span-full gap-3">
          <ContactNameField />
          <PhoneField />
          <EmailField />
          <StatusSelect />
        </Grid>
        <AddressFields />
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { OrganizationForm, type SchemaType }
