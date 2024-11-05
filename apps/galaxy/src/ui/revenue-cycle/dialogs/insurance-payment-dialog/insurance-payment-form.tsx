import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getPracticeIdsAction } from '@/actions'
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
  const [practiceId, setPracticeId] = useState('')
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id ?? '',
      insuranceName: data?.insuranceName ?? '',
      paymentMethod: data?.paymentMethod ?? '',
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

  useEffect(() => {
    getPracticeIdsAction().then((result) => {
      if (result.state === 'success') {
        setPracticeId(result.data[0].value) // first practice id
      }
    })
  }, [])

  const onSave = async (formData: SchemaType) => {
    const fileNamesList = form.getValues('attachments') || []

    if (fileNamesList.length === 0) {
      toast.error('Please upload at least one attachment file')
      return
    }

    const formDataObj = new FormData()
    fileNamesList.forEach((item) => {
      if (item.file) formDataObj.append('files', item.file)
    })

    const attachmentFiles: PaymentAttachments[] = []
    if (data?.id) {
      fileNamesList.forEach((item) => {
        if (!item.isNewUpload) attachmentFiles.push(item)
      })
    }

    delete formData.attachments

    const reqPayload: Partial<InsurancePayment> = {
      ...formData,
      checkDate: formatDateToISOString(formData.checkDate) || '',
      receivedDate: formatDateToISOString(formData.receivedDate) || '',
      depositDate: formatDateToISOString(formData.depositDate) || '',
      paymentAttachments: attachmentFiles,
      practiceId: practiceId,
    }

    if (data && data?.id) {
      reqPayload.id = data.id
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)

    const response =
      data && data.id
        ? await updateInsurancePaymentAction(sanitizedPayload, data?.id)
        : await addInsurancePaymentAction(sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      if (formDataObj.getAll('files').length > 0) {
        const attachmentsResponse =
          await createInsurancePaymentAttachmentsAction(
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
      search({})
    } else {
      toast.error('Unable to save record')
    }
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
