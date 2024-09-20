import { UseFormRegister, UseFormUnregister } from 'react-hook-form'
import { PaymentMethod } from '../types'
import { PaymentDetailSchema } from './payment-detail-schema'

const handlePaymentMethodFieldRegistration = (
  paymentMethod: string,
  register: UseFormRegister<PaymentDetailSchema>,
  unregister: UseFormUnregister<PaymentDetailSchema>,
) => {
  unregister('defaultCardId')
  unregister('checkNumber')
  unregister('cashAmount')
  unregister('transactionNumber')

  switch (paymentMethod) {
    case PaymentMethod.CreditCard:
      register('defaultCardId')
      break
    case PaymentMethod.Cheque:
      register('checkNumber')
      break
    case PaymentMethod.Cash:
      register('cashAmount')
      break
    case PaymentMethod.CMD:
      register('transactionNumber')
      break
    default:
      break
  }
}

const paymentMethodRequiredFields: Record<
  PaymentMethod,
  { field: keyof PaymentDetailSchema; message: string }
> = {
  [PaymentMethod.CreditCard]: {
    field: 'defaultCardId',
    message: 'Card Required',
  },
  [PaymentMethod.Cheque]: {
    field: 'checkNumber',
    message: 'Check Number Required',
  },
  [PaymentMethod.Cash]: {
    field: 'cashAmount',
    message: 'Cash Amount Required',
  },
  [PaymentMethod.CMD]: {
    field: 'transactionNumber',
    message: 'Transaction Number Required',
  },
}

export { handlePaymentMethodFieldRegistration, paymentMethodRequiredFields }
