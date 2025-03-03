'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  AddressFieldsGroup,
  CheckboxInput,
  FormContainer,
  LoadingPlaceholder,
} from '@/components'
import { PayerPlanAddressResponse } from '@/types'
import { sanitizeFormData } from '@/utils'
import {
  addPayerPlanAddressAction,
  getPayerPlanAddressById,
  updatePayerPlanAddressAction,
} from '../../actions'

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
  data?: PayerPlanAddressResponse | null
  isEditMode?: boolean
  payerId?: string
  onCloseModal: (open: boolean) => void
}
const PayerPlanAddressForm = ({
  data,
  isEditMode,
  payerId,
  onCloseModal,
}: PayerPlanAddressFormProps) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<SchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      status: true,
    },
  })

  useEffect(() => {
    if (data?.id && payerId) {
      ;(async () => {
        setLoading(true)
        const result = await getPayerPlanAddressById(payerId, data?.id)
        if (result.state === 'success') {
          const { street1, street2, postalCode } = result.data.address
          form.reset({
            ...result.data.address,
            status: result.data.recoredStatus === 'Active',
            address1: street1,
            address2: street2,
            zip: postalCode,
          })
        } else if (result.state === 'error') {
          toast.error(result.error ?? 'Failed to get payer plan address')
        }
        setLoading(false)
      })()
    }

    if (isEditMode) {
      form.setFocus('address2')
    }
  }, [])
  const onsubmit = async (formData: SchemaType) => {
    const reqPayload: PayerPlanAddressResponse = {
      id: data?.id ?? '',
      recoredStatus: formData.status ? 'Active' : 'Inactive',
      address: {
        type: data?.address.type ?? 'Business',
        street1: formData.address1,
        street2: formData.address2 ?? '',
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
      },
    }

    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response = isEditMode
      ? await updatePayerPlanAddressAction(
          sanitizedPayload,
          payerId ?? '',
          data?.id ?? '',
        )
      : await addPayerPlanAddressAction(sanitizedPayload, payerId ?? '')
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      form.reset()
      toast.success('Record has been saved successfully')
      onCloseModal(false)
    }
  }

  if (loading) return <LoadingPlaceholder className="min-h-[27vh]" />

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
