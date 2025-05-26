'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  AddressFieldsGroup,
  FormContainer,
  LoadingPlaceholder,
} from '@/components'
import { PayerPlanAddressResponse } from '@/types'
import { ConfirmationDialog } from '@/ui/revenue-cycle/dialogs/confirmation-dialog'
import { sanitizeFormData, zipLast4Schema } from '@/utils'
import {
  addPayerPlanAddressAction,
  getPayerPlanAddressById,
  updatePayerPlanAddressAction,
} from '../../actions'
import { useStore } from '../store'
import { DefaultAddressCheckbox } from './default-address-checkbox'
import { StatusCheckbox } from './status-checkbox'

const addressSchema = z.object({
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  zipLast4: zipLast4Schema,
  status: z.boolean(),
  isDefaultLocation: z.boolean(),
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
  const [defaultConfirmationOpen, setDefaultConfirmationOpen] = useState(false)
  const { addressData } = useStore((state) => ({
    addressData: state.addressData,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      zipLast4: '',
      status: true,
      isDefaultLocation: addressData.length === 0,
    },
  })

  useEffect(() => {
    if (data?.id && payerId) {
      ;(async () => {
        setLoading(true)
        const result = await getPayerPlanAddressById(payerId, data?.id)
        if (result.state === 'success') {
          const { street1, street2, postalCode, zipLast4 } = result.data.address

          form.reset({
            ...result.data.address,
            isDefaultLocation: result.data.isDefaultLocation ?? false,
            status: result.data.recoredStatus === 'Active',
            address1: street1,
            address2: street2,
            zip: postalCode,
            zipLast4: zipLast4,
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

  const onSubmit = async (formData: SchemaType) => {
    if (
      form.getFieldState('isDefaultLocation').isDirty &&
      formData.isDefaultLocation &&
      !defaultConfirmationOpen
    ) {
      onDefaultConfirmation()
    } else {
      if (defaultConfirmationOpen) onDefaultConfirmation()
      const reqPayload: PayerPlanAddressResponse = {
        id: data?.id ?? '',
        recoredStatus: formData.status ? 'Active' : 'Inactive',
        isDefaultLocation: formData.isDefaultLocation,
        address: {
          type: data?.address.type ?? 'Business',
          street1: formData.address1,
          street2: formData.address2 ?? '',
          city: formData.city,
          state: formData.state,
          postalCode: formData.zip,
          zipLast4: formData.zipLast4 ?? '',
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
  }
  const onDefaultConfirmation = () =>
    setDefaultConfirmationOpen(!defaultConfirmationOpen)
  if (loading) return <LoadingPlaceholder className="min-h-[27vh]" />

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <ConfirmationDialog
        onConfirmation={form.handleSubmit((data) => onSubmit(data))}
        isOpen={defaultConfirmationOpen}
        closeDialog={onDefaultConfirmation}
        heading="Confirmation"
        content="The previously selected default address will no longer be the default. Do you want to continue?"
      />
      <AddressFieldsGroup />
      <Flex gap="2" align="center">
        <StatusCheckbox />
        <DefaultAddressCheckbox />
      </Flex>
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <Button
          type="submit"
          size="1"
          disabled={form.formState.isSubmitting}
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

export { PayerPlanAddressForm, type SchemaType }
