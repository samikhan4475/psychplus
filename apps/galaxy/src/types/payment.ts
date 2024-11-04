interface PatientPayment {
  id: number
  patientId: number
  appointmentId: number
  paymentType: string
  amount: number
  paymentDateTime: string
  cardId: number
  cardKey: string
  transactionKey: string
  isOtherPayment: boolean
  paymentMethod: string
  paymentDescription: string
  stripeAmountCaptured: number
  stripeChargeCreatedOn: string
  isStripeChargeCaptured: boolean
  isPaymentRefund: boolean
  preferredPartnerId: string
  isPreferredPartnerPayment: boolean
}

export type { PatientPayment }
