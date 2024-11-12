import { PaymentDetailSchemaType } from './payment-schema'
import { PaymentMethod } from './types'

const paymentMethodRequiredFields: Record<
  PaymentMethod,
  { field: keyof PaymentDetailSchemaType; message: string } | null
> = {
  [PaymentMethod.CreditCard]: {
    field: 'card_Key',
    message: 'Card Required',
  },

  [PaymentMethod.Cheque]: {
    field: 'paymentDescription',
    message: 'Check Number Required',
  },
  [PaymentMethod.CMD]: {
    field: 'paymentDescription',
    message: 'Transaction Number Required',
  },
  [PaymentMethod.Cash]: null,
}

const twoDecimal = (amount: number): string => {
  return amount.toFixed(2)
}

const maskCardNumber = (lastDigits: string): string => {
  return `****-****-***-${lastDigits}`
}

const getInitialValues = () => ({
  paymentMethod: PaymentMethod.CreditCard,
  paymentType: [],
  coInsApp: [],
  coPayApp: [],
  coInsAmount: '',
  coPayAmount: '',
  remainingBalance: '',
  customAmount: '',
  outstandingBalanceAmount: '',
  card_Key: '',
  card_id: '',
  paymentDescription: '',
})

export {
  paymentMethodRequiredFields,
  twoDecimal,
  maskCardNumber,
  getInitialValues,
}
