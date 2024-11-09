import { PaymentMap } from '../types'
import { PaymentDetailSchemaType } from './payment-schema'
import { ChargePaymentParams, PaymentType } from './types'

const transformOut = (
  patientId: string,
  coInsuranceMap: PaymentMap,
  coPayMap: PaymentMap,
  data: PaymentDetailSchemaType,
): ChargePaymentParams[] => {
  const {
    coInsApp = [],
    coPayApp = [],
    card_Key = '',
    card_id = '',
    paymentDescription = '',
    paymentMethod,
    customAmount,
    outstandingBalanceAmount,
    paymentType,
  } = data

  const commonPaymentData = {
    cardKey: card_Key,
    cardId: card_id,
    paymentDescription,
    patientId,
    paymentMethod,
    isOtherPayment: false,
  }

  return [
    ...coInsApp.map((item) => ({
      ...commonPaymentData,
      appointmentId: item,
      amount: coInsuranceMap[item],
      paymentType: PaymentType.CoIns,
    })),
    ...coPayApp.map((item) => ({
      ...commonPaymentData,
      appointmentId: item,
      amount: coPayMap[item],
      paymentType: PaymentType.CoPay,
    })),
    ...(paymentType.includes(PaymentType.CustomPayment) && customAmount
      ? [
          {
            ...commonPaymentData,
            appointmentId: 0,
            amount: customAmount,
            paymentType: PaymentType.CustomPayment,
          },
        ]
      : []),
    ...(paymentType.includes(PaymentType.OutstandingBalance) &&
    outstandingBalanceAmount
      ? [
          {
            ...commonPaymentData,
            appointmentId: 0,
            amount: outstandingBalanceAmount,
            paymentType: PaymentType.OutstandingBalance,
          },
        ]
      : []),
  ]
}

export { transformOut }
