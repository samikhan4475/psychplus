'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer, FormSubmitButton } from '@/components'
import { PayerResponse, UpdatePayer } from '@/types'
import { sanitizeFormData } from '@/utils'
import { updatePayerAction } from '../../../actions'
import { useStore } from '../../store'
import { EditPayerName } from './edit-payer-name-input'
import { EditPayerStatus } from './edit-payer-status-input'

const schema = z.object({
  payerId: z.string(),
  payerName: z.string().min(1, 'Payer name is required'),
  recordStatus: z.string(),
})

type SchemaType = z.infer<typeof schema>

interface EditPayerFormProps {
  onCloseModal: (open: boolean) => void
  payer: PayerResponse
}

const EditPayerForm = ({ onCloseModal, payer }: EditPayerFormProps) => {
  const { search, payload, page } = useStore((state) => ({
    search: state.search,
    payload: state.payload,
    page: state.page,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      payerId: payer.payerId,
      payerName: payer.payerName,
      recordStatus: payer.recordStatus,
    },
  })

  const onSubmit = async (formData: SchemaType) => {
    const sanitizedPayload = sanitizeFormData(formData)
    const reqPayload: Partial<UpdatePayer> = {
      ...sanitizedPayload,
    }

    const response = await updatePayerAction(payer.payerId, reqPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      onCloseModal(false)
      form.reset()
      toast.success('Payer has been updated successfully')
      search(payload, page)
    }
  }

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <Grid columns="1" className="mb-2 mt-2 gap-3 pl-2 pr-2">
        <EditPayerName />
        <EditPayerStatus />
      </Grid>
      <Box className="mt-4 flex justify-end">
        <FormSubmitButton size="2" highContrast form={form}>
          Save
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}

export { EditPayerForm }
