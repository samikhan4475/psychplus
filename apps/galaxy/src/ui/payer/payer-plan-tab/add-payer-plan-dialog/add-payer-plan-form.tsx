import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { AddPayerPlan } from '@/types'
import { sanitizeFormData } from '@/utils'
import { addPayerPlanAction } from '../../actions'
import { PayerPlanForm } from '../payer-plan-form/payer-plan-form'
import { addPayerPlanSchema, type SchemaType } from '../schema'
import { useStore } from '../store'

interface AddPayerPlanFormProps {
  onCloseModal: (open: boolean) => void
}

const AddPayerPlanForm = ({ onCloseModal }: AddPayerPlanFormProps) => {
  const { search, payload, page } = useStore((state) => ({
    search: state.search,
    payload: state.payload,
    page: state.page,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(addPayerPlanSchema),
    defaultValues: {},
  })

  const onsubmit = async (formData: SchemaType) => {
    const sanitizedPayload = sanitizeFormData(formData)
    const reqPayload: Partial<AddPayerPlan> = {
      ...sanitizedPayload,
      isActive: sanitizedPayload.payerStatus === 'Active',
      isTest: formData.isTest ?? false,
      isPublicViewable: formData.isPublicViewable,
    }
    const response = await addPayerPlanAction(reqPayload, formData.payerId)

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
      <PayerPlanForm isEditMode={false} />
      <Box className="mt-4 flex justify-end">
        <FormSubmitButton size="2" highContrast form={form}>
          Save
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}

export { AddPayerPlanForm }
