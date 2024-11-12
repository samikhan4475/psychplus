'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { Appointment, CreditCard } from '@/types'
import { AddCardDialog } from '../add-credit-card-dialog'
import { usePrimaryCardDetails } from '../hooks'
import { PaymentHistoryDialog } from '../payment-history-dialog'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentDescriptionInput } from '../shared'
import { PaymentMethod } from '../types'
import { CardDetails } from './card-details'
import { CheckInput } from './check-input'
import { MakePaymentButton } from './make-payment-button'
import { SelectMethod } from './select-method'

interface PaymentDetailsProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  appointment?: Appointment
}

const PaymentDetails = ({
  stripeApiKey,
  patientId,
  googleApiKey,
  appointment,
}: PaymentDetailsProps) => {
  const { watch } = useFormContext<PaymentDetailSchemaType>()
  const { primaryCardDetails } = usePrimaryCardDetails()
  const paymentMethod = watch('paymentMethod')
  return (
    <Flex direction="column" className="rounded-2 shadow-2" width="100%">
      <Flex
        width="100%"
        justify="between"
        align="center"
        gap="2"
        className="bg-blue-3 px-2 py-0.5"
      >
        <Text size="2" weight="medium">
          Payment Details
        </Text>
        <FormFieldError name="card_Key" />
        {paymentMethod === PaymentMethod.CreditCard && (
          <AddCardDialog
            patientId={patientId}
            stripeApiKey={stripeApiKey}
            googleApiKey={googleApiKey}
          />
        )}
      </Flex>
      <Flex gap="3" className="justify-between px-2 py-2">
        <Flex gap="3" className="flex-1">
          <SelectMethod primaryCardDetails={primaryCardDetails} />
          {renderPaymentDetailInput(paymentMethod, primaryCardDetails)}
        </Flex>
        <Flex gap="3">
          <MakePaymentButton />
          {appointment?.appointmentId && (
            <PaymentHistoryDialog patientId={patientId} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

const renderPaymentDetailInput = (
  paymentMethod: string,
  primaryCard?: CreditCard,
) => {
  switch (paymentMethod) {
    case PaymentMethod.CMD:
      return <PaymentDescriptionInput label="Transaction Number" />
    case PaymentMethod.Cheque:
      return <CheckInput label="Check Number" />
    case PaymentMethod.CreditCard:
      return <CardDetails primaryCard={primaryCard} />
    default:
      return
  }
}

export { PaymentDetails }
