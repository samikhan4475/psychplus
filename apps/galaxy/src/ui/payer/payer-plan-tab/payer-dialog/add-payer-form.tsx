import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { PayerName } from './payer-name-input'
import { SubmitFormButton } from './submit-button'

const schema = z.object({
  id: z.string().optional(),
  name: z.string(),
})
type SchemaType = z.infer<typeof schema>

const PayerForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  const onsubmit = async (formData: SchemaType) => {
    // #TODO save api
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

export { PayerForm, type SchemaType }
