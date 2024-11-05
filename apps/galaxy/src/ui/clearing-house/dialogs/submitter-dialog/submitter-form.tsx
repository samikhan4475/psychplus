import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { addSubmitterAction, updateSubmitterAction } from '../../actions'
import { useStore } from '../../submitter-tab/store'
import { ClearingHouseSubmitter } from '../../types'
import { ContactPersonField } from './contact-person-field'
import { defaultValues } from './default-values'
import { FaxField } from './fax-field'
import { NameField } from './name-field'
import { PhoneField } from './phone-field'
import { PracticeNameSelect } from './practice-name-select'
import { ReceiverSelect } from './receiver-select'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'
import { SubmitterIdField } from './submitter-id-field'
import { UserEmailField } from './user-email-field'
import { UserNameField } from './user-name-field'
import { UserPasswordField } from './user-password-field'

interface SubmitterFormProps {
  data?: ClearingHouseSubmitter | null
  onCloseModal: (open: boolean) => void
}

const SubmitterForm = ({ data, onCloseModal }: SubmitterFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data),
  })

  const onSave = async (formData: SchemaType) => {
    const reqPayload: Partial<ClearingHouseSubmitter> = {
      ...formData,
      addressLine1: formData.address1,
      addressLine2: formData.address2,
    }

    if (data && data?.id) {
      reqPayload.id = data.id
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)

    const response =
      data && data.id
        ? await updateSubmitterAction(sanitizedPayload, data?.id)
        : await addSubmitterAction(sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.state === 'success') {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      search({})
    }
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-4">
            <NameField />
          </Box>
          <Box className="col-span-4">
            <UserNameField />
          </Box>
          <Box className="col-span-4">
            <UserPasswordField />
          </Box>
        </Grid>
        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-4">
            <UserEmailField />
          </Box>
          <Box className="col-span-4">
            <SubmitterIdField />
          </Box>
          <Box className="col-span-4">
            <ContactPersonField />
          </Box>
        </Grid>
        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-4">
            <PhoneField />
          </Box>
          <Box className="col-span-4">
            <FaxField />
          </Box>
          <Box className="col-span-4">
            <ReceiverSelect />
          </Box>
        </Grid>

        <Grid columns="12" className="mb-2 mt-2 gap-3">
          <Box className="col-span-4">
            <PracticeNameSelect />
          </Box>
        </Grid>

        <AddressFieldsGroup columnsPerRow="2" title="Primary Address" />
      </Box>

      <SubmitFormButton />
    </FormContainer>
  )
}

export { SubmitterForm, type SchemaType }
