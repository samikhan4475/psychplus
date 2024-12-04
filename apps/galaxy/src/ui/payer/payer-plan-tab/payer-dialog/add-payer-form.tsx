import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { AddPayer } from '@/types'
import { sanitizeFormData } from '@/utils'
import { addPayerAction } from '../../actions'
import { PayerName } from './payer-name-input'
import { SubmitFormButton } from './submit-button'

interface AddPayerFormProps {
  onCloseModal: (open: boolean) => void
  setAddingNewPayer: (open: boolean) => void
}

const schema = z.object({
  id: z.string().optional(),
  payername: z.string().min(1, 'Required'),
})
type PayerFormSchemaType = z.infer<typeof schema>

const PayerForm = ({ onCloseModal, setAddingNewPayer }: AddPayerFormProps) => {
  const form = useForm<PayerFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  const onsubmit = async (formData: PayerFormSchemaType) => {
    setAddingNewPayer(true)
    const reqPayload: Partial<AddPayer> = {
      ...formData,
      name: formData.payername,
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response = await addPayerAction(sanitizedPayload)

    if (response.state === 'error') {
      setAddingNewPayer(false)
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      setAddingNewPayer(false)
    }
  }

  return (
    <FormContainer onSubmit={onsubmit} form={form}>
      <Grid columns="2" className="mb-2 mt-2 gap-3 pl-2 pr-2">
        <PayerName />
      </Grid>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { PayerForm, type PayerFormSchemaType }
