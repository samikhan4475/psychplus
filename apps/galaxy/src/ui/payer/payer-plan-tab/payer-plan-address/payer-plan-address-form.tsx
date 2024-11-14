'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AddressFieldsGroup, CheckboxInput, FormContainer } from '@/components'
import { PayerPlanAddress } from '@/types/payer'

const addressSchema = z.object({
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  status: z.boolean(),
})
type SchemaType = z.infer<typeof addressSchema>

interface PayerPlanAddressFormProps {
  data?: PayerPlanAddress | null
}
const PayerPlanAddressForm = ({ data }: PayerPlanAddressFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address1: data?.address1 ?? '',
      address2: data?.address2 ?? '',
      city: data?.city ?? '',
      state: data?.state ?? '',
      zip: data?.zip ?? '',
      status: data?.status === 'Active',
    },
  })

  const onsubmit = async (formData: SchemaType) => {
    // #TODO save API
  }

  return (
    <FormContainer onSubmit={onsubmit} form={form}>
      <AddressFieldsGroup />

      <Text className="pt-2 text-[11.5px] font-[600]">
        <CheckboxInput
          field="status"
          label="Mark as Active"
          checked={form.watch('status')}
        />
      </Text>
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <Button
          type="submit"
          size="1"
          highContrast
          className="h-auto px-1 py-1 text-[11px] font-[300]"
        >
          <SaveIcon width={15} height={15} strokeWidth={1.75} />
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { PayerPlanAddressForm }
