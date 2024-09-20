'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import {
  paymentDetailschema,
  type PaymentDetailSchema,
} from './payment-detail-schema'

interface PaymentDetailFormProps {
  patientId: string
  onClose?: () => void
}

const PaymentDetailForm = ({
  patientId,
  children,
  onClose,
}: React.PropsWithChildren<PaymentDetailFormProps>) => {
  const form = useForm<PaymentDetailSchema>({
    criteriaMode: 'all',
    resolver: zodResolver(paymentDetailschema),
    reValidateMode: 'onChange',
    defaultValues: {
      paymentMethod: 'Credit Card',
      defaultCardId: '',
      paymentType: [],
      coInsApp: [],
      coPayApp: [],
      remainingBalance: '300',
      customAmount: '',
      outstandingBalanceAmount: '',
    },
  })

  const onSubmit: SubmitHandler<PaymentDetailSchema> = async (data) => {
    toast.success('Payment detail saved!')
    onClose?.()
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
