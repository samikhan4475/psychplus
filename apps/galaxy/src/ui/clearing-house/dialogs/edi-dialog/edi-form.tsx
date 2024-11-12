import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { addEdiAction, updateEdiAction } from '../../actions'
import { useStore } from '../../edi-tab/store'
import { EdiItem } from '../../types'
import { defaultValues } from './default-values'
import { InsurancePayerNameSelect } from './insurance-payer-name-field'
import { PayerIdField } from './payer-id-field'
import { ReceiverNameSelect } from './receiver-name-select'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'
import { SwitchFormField } from './switch-form-field'

interface InsurancePaymentFormProps {
  data?: EdiItem
  onCloseModal: (open: boolean) => void
}

const EdiForm = ({ data, onCloseModal }: InsurancePaymentFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data),
  })

  const onSave = async (formData: SchemaType) => {
    const reqPayload: Partial<EdiItem> = {
      ...formData,
    }
    if (data && data?.id) {
      reqPayload.id = data.id
    }
    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response =
      data && data.id
        ? await updateEdiAction(sanitizedPayload, data?.id)
        : await addEdiAction(sanitizedPayload)

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
      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Plan Details
          </Text>
        </Box>

        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-4">
            <InsurancePayerNameSelect />
          </Box>
          <Box className="col-span-4">
            <PayerIdField />
          </Box>
          <Box className="col-span-4">
            <ReceiverNameSelect />
          </Box>
        </Grid>
      </Box>

      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <SwitchFormField
          label="Allow electronic submission (Professional)"
          field="isElectronic"
        />
        <SwitchFormField
          label="Allow electronic submission (Institutional)"
          field="isInstitutional"
        />
        <SwitchFormField
          label="Allow electronic submission (Dental)"
          field="isDental"
        />
        <SwitchFormField
          label="Allow paper submission (CMS-1500)"
          field="isPaperCms1500"
        />
        <SwitchFormField
          label="Allow paper submission (UB04)"
          field="isPaperUb04"
        />
        <SwitchFormField label="Allow Eligibility" field="isEligibility" />
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { EdiForm, type SchemaType }
