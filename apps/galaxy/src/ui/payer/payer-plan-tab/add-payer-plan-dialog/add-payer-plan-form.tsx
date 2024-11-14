import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import { PayerPlanForm } from '../payer-plan-form/payer-plan-form'
import { payerPlanSchema, type SchemaType } from '../schema'

const AddPayerPlanForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(payerPlanSchema),
    defaultValues: {},
  })

  const onsubmit = async (formData: SchemaType) => {
    // #TODO save api
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
