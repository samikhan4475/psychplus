'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { chargePaymentAction } from './actions'
import { paymentSchema, type PaymentDetailSchemaType } from './payment-schema'
import { useStore } from './store'
import { transformOut } from './transform'
import { getInitialValues } from './utils'

interface PaymentDetailFormProps {
  patientId: string
  appointmentId?: number
  onClose: () => void
  remainingBalance?: string
  loading: boolean
}

const PaymentDetailForm = ({
  patientId,
  appointmentId,
  children,
  remainingBalance,
  onClose,
  loading,
}: React.PropsWithChildren<PaymentDetailFormProps>) => {
  const { coPayMap, coInsuranceMap } = useStore((state) => ({
    coPayMap: state.coPayMap,
    coInsuranceMap: state.coInsuranceMap,
  }))

  const form = useForm<PaymentDetailSchemaType>({
    disabled: loading,
    criteriaMode: 'all',
    resolver: zodResolver(paymentSchema),
    reValidateMode: 'onChange',
    defaultValues: getInitialValues(appointmentId),
  })

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      outstandingBalanceAmount: remainingBalance,
      remainingBalance: remainingBalance,
    })
  }, [remainingBalance, form])

  const onSubmit: SubmitHandler<PaymentDetailSchemaType> = async (data) => {
    const sanitizedFormData = sanitizeFormData(data)

    const payload = transformOut(
      patientId,
      coInsuranceMap,
      coPayMap,
      sanitizedFormData,
    )

    const response = await chargePaymentAction(payload)

    if (response.state === 'error') {
      toast.error(response.error ?? 'Error while saving')
      return
    }

    toast.success('Charge created successfully!')
    onClose()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" className="flex-1 overflow-auto p-0.5">
        {children}
      </Flex>
    </FormContainer>
  )
}

export { PaymentDetailForm }
