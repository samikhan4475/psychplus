import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { AddPayer } from '@/types'
import { addPayerAction } from '@/ui/payer/actions'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../../store'
import { PayerName } from './payer-name-input'
import { SubmitFormButton } from './submit-button'

interface AddPayerFormProps {
  onCloseModal: (open: boolean) => void
}

const schema = z.object({
  id: z.string().optional(),
  payerName: z.string().min(1, 'Required'),
})
type PayerFormSchemaType = z.infer<typeof schema>

const PayerForm = ({ onCloseModal }: AddPayerFormProps) => {
  const { search, payload, page } = useStore((state) => ({
    search: state.search,
    payload: state.payload,
    page: state.page,
  }))

  const form = useForm<PayerFormSchemaType>({
    resolver: zodResolver(schema),
  })

  const onsubmit = async (formData: PayerFormSchemaType) => {
    const reqPayload: Partial<AddPayer> = {
      ...formData,
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response = await addPayerAction(sanitizedPayload)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      search(payload, page)
    }
  }

  return (
    <FormContainer onSubmit={onsubmit} form={form}>
      <Flex gapY="2" direction="column">
        <PayerName />
      </Flex>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { PayerForm, type PayerFormSchemaType }
