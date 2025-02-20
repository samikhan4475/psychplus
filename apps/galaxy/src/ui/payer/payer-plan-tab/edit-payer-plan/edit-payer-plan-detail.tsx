import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { UpdatePayerPlan } from '@/types'
import { sanitizeFormData } from '@/utils'
import { getPayerPlanByIdAction, updatePayerPlanAction } from '../../actions'
import { PayerPlanAddressView } from '../payer-plan-address'
import { PayerPlanForm } from '../payer-plan-form/payer-plan-form'
import { updatePayerPlanSchema, UpdatePayerPlanSchemaType } from '../schema'

interface EditPayerPlanDetailProps {
  selectPayerPlanId: string
}

const EditPayerPlanDetail = ({
  selectPayerPlanId,
}: EditPayerPlanDetailProps) => {
  const form = useForm<UpdatePayerPlanSchemaType>({
    resolver: zodResolver(updatePayerPlanSchema),
    defaultValues: {},
  })
  const fetchPayerData = async (selectPayerPlanId: string) => {
    const payerResponse = await getPayerPlanByIdAction(selectPayerPlanId)
    if (payerResponse.state === 'success') {
      const formData = {
        ...payerResponse.data,
        payerStatus: payerResponse.data.isActive ? 'Active' : 'Inactive',
      }
      form.reset(formData)
    } else {
      toast('Failed to fetch payer data')
    }
  }
  useEffect(() => {
    if (selectPayerPlanId) {
      fetchPayerData(selectPayerPlanId)
    }
  }, [selectPayerPlanId])

  const onSubmit = async (formData: UpdatePayerPlanSchemaType) => {
    const sanitizedPayload = sanitizeFormData(formData)
    const reqPayload: Partial<UpdatePayerPlan> = {
      ...sanitizedPayload,
      isActive: sanitizedPayload.payerStatus === 'Active',
      isTest: formData.isTest ?? false,
      isPublicViewable: formData.isPublicViewable,
    }
    const response = await updatePayerPlanAction(
      reqPayload,
      formData.payerId,
      formData.id,
    )

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      toast.success('Record has been saved successfully')
      fetchPayerData(selectPayerPlanId)
    }
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-white">
      <Flex direction="column" gap="2" className="flex-1">
        <Flex
          p="2"
          className="bg-white sticky -top-[1px] mt-[1px] border border-gray-5 "
        >
          <Text className="text-[16px] font-[600] text-accent-12">Profile</Text>
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
        </Flex>

        <PayerPlanForm isEditMode={true} />
        <PayerPlanAddressView payerId={form.getValues('id')} />
      </Flex>
    </FormContainer>
  )
}

export { EditPayerPlanDetail }
