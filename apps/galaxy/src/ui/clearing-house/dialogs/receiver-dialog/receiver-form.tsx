import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { ClearingHouseReceiver } from '@/types'
import { sanitizeFormData } from '@/utils'
import { addReceiverAction, updateReceiverAction } from '../../actions'
import { useStore } from '../../receiver-tab/store'
import { AddressFields } from './address-fields'
import { BatchResponseDirectoryField } from './batch-response-directory-field'
import { ChResponseDirectoryField } from './ch-response-directory-field'
import { ClaimResponseDirectoryField } from './claim-response-directory-field'
import { ClearinghouseNameField } from './clearinghouse-name-field'
import { defaultValues } from './default-values'
import { EmailField } from './email-field'
import { EraResponseDirectoryField } from './era-response-directory-field'
import { FaxField } from './fax-field'
import { GS03Field } from './gs-03-field'
import { ISA01Field } from './isa-01-field'
import { ISA03Field } from './isa-03-field'
import { ISA05Field } from './isa-05-field'
import { ISA07Field } from './isa-07-field'
import { ISA08Field } from './isa-08-field'
import { NM140ReceiverIdField } from './nm1-40-receiver-id-field'
import { NM140ReceiverNameField } from './nm1-40-receiver-name-field'
import { PhoneField } from './phone-field'
import { ReceiverIdField } from './receiver-id-field'
import { ReceiverNameField } from './receiver-name-field'
import { schema, type SchemaType } from './schema'
import { SubmissionDirectoryField } from './submission-directory-field'
import { SubmissionMethodSelect } from './submission-method-select'
import { SubmissionPortField } from './submission-port-field'
import { SubmissionUrlField } from './submission-url-field'
import { SubmitFormButton } from './submit-form-button'
import { SupportMultipleDirectoriesField } from './support-multiple-directories-field'
import { WebsiteField } from './website-field'

interface InsurancePaymentFormProps {
  data?: ClearingHouseReceiver | null
  onCloseModal: (open: boolean) => void
}

const ReceiverForm = ({ data, onCloseModal }: InsurancePaymentFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data),
  })

  const onSave = async (formData: SchemaType) => {
    const reqPayload: Partial<ClearingHouseReceiver> = {
      ...formData,
      isSupportMultipleDirectory: formData.isSupportMultipleDirectory === 'yes',
    }
    if (data && data?.id) {
      reqPayload.id = data.id
    }
    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response =
      data && data.id
        ? await updateReceiverAction(sanitizedPayload, data?.id)
        : await addReceiverAction(sanitizedPayload)

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
        <Grid columns="4" className="mb-2 mt-2 gap-3">
          <ClearinghouseNameField />
          <ReceiverNameField />
          <ReceiverIdField />
          <PhoneField />
          <FaxField />
          <EmailField />
          <WebsiteField />
          <SubmissionMethodSelect />
          <Grid columns="3" className="col-span-full gap-3">
            <SubmissionUrlField />
            <SubmissionPortField />
            <SubmissionDirectoryField />
          </Grid>
          <BatchResponseDirectoryField />
          <ChResponseDirectoryField />
          <ClaimResponseDirectoryField />
          <EraResponseDirectoryField />
          <Grid columns="6" className="col-span-full gap-3">
            <ISA01Field />
            <ISA03Field />
            <ISA05Field />
            <ISA07Field />
            <ISA08Field />
            <GS03Field />
          </Grid>
          <NM140ReceiverNameField />
          <NM140ReceiverIdField />
        </Grid>
        <SupportMultipleDirectoriesField />
        <AddressFields />
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { ReceiverForm, type SchemaType }
