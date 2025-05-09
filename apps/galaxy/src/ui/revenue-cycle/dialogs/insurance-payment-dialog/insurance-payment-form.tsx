import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getUserAuthAction } from '@/actions'
import { FormContainer } from '@/components'
import {
  formatDateToISOString,
  getLocalCalendarDate,
  sanitizeFormData,
} from '@/utils'
import {
  addInsurancePaymentAction,
  createInsurancePaymentAttachmentsAction,
  updateInsurancePaymentAction,
} from '../../actions'
import { useStore } from '../../insurance-payment-tab/store'
import { InsurancePayment, PaymentAttachments } from '../../types'
import { AmountField } from './amount-field'
import { Attachments } from './attachments'
import { CheckDateField } from './check-date-field'
import { CheckNumberField } from './check-number-field'
import { CommentsTextarea } from './comments-textarea'
import { DepositDateField } from './deposit-date-field'
import { InsuranceNameField } from './insurance-name-field'
import { PaymentMethodSelect } from './payment-method-select'
import { ReceivedDateField } from './received-date-field'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'

interface InsurancePaymentFormProps {
  data?: InsurancePayment | null
  onCloseModal: (open: boolean) => void
}

const InsurancePaymentForm = ({
  data,
  onCloseModal,
}: InsurancePaymentFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id ?? '',
      insuranceName: data?.insuranceName ?? '',
      paymentMethod: data?.paymentMethod ?? 'Check',
      amount: data?.amount,
      checkNumber: data?.checkNumber ?? '',
      comments: data?.comments ?? '',
      checkDate: data?.checkDate && getLocalCalendarDate(data?.checkDate),
      receivedDate:
        data?.receivedDate && getLocalCalendarDate(data?.receivedDate),
      depositDate: data?.depositDate && getLocalCalendarDate(data?.depositDate),
      attachments: data?.paymentAttachments ?? [],
    },
  })

  async function onSave(formData: SchemaType) {
    const user = await getUserAuthAction()

    const attachmentsList = form.getValues('attachments') ?? []

    if (attachmentsList.length === 0) {
      toast.error('Please upload at least one attachment file')
      return
    }

    const formDataObj = new FormData()
    attachmentsList.forEach((item) => {
      if (item.file) formDataObj.append('files', item.file)
    })

    const attachmentFiles: PaymentAttachments[] = []
    if (data?.id) {
      attachmentsList.forEach((item) => {
        if (!item.isNewUpload) attachmentFiles.push(item)
      })
    }

    const { attachments, ...restFormData } = formData

    const reqPayload: Partial<InsurancePayment> = {
      ...restFormData,
      checkDate: formatDateToISOString(formData.checkDate) ?? '',
      receivedDate: formatDateToISOString(formData.receivedDate) ?? '',
      depositDate: formatDateToISOString(formData.depositDate) ?? '',
      paymentAttachments: attachmentFiles,
      practiceId: user?.practiceId,
    }

    const finalPayload = data?.id
      ? {
          ...data,
          ...reqPayload,
        }
      : {
          ...reqPayload,
          status: 'NeedPosted',
          paymentType: 'Eob',
        }

    delete finalPayload['claimPayments']
    const sanitizedPayload = sanitizeFormData(finalPayload)
    const response = data?.id
      ? await updateInsurancePaymentAction(sanitizedPayload, data?.id)
      : await addInsurancePaymentAction(sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (formDataObj.getAll('files').length > 0) {
      const attachmentsResponse = await createInsurancePaymentAttachmentsAction(
        formDataObj,
        response.data.id,
      )

      if (attachmentsResponse.state === 'error') {
        toast.error(attachmentsResponse.error)
        return
      }
    }

    onCloseModal(false)
    form.reset()
    toast.success('Record has been saved successfully')
    search()
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Insurance Details
          </Text>
        </Box>

        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-6">
            <InsuranceNameField />
          </Box>
          <Box className="col-span-6">
            <PaymentMethodSelect />
          </Box>
          <Box className="col-span-6">
            <CheckNumberField />
          </Box>
          <Box className="col-span-6">
            <AmountField />
          </Box>
        </Grid>
        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-4">
            <CheckDateField />
          </Box>
          <Box className="col-span-4">
            <ReceivedDateField />
          </Box>
          <Box className="col-span-4">
            <DepositDateField />
          </Box>
        </Grid>
        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-12">
            <CommentsTextarea />
          </Box>
        </Grid>
      </Box>

      <Attachments />

      <SubmitFormButton />
    </FormContainer>
  )
}

export { InsurancePaymentForm, type SchemaType }
