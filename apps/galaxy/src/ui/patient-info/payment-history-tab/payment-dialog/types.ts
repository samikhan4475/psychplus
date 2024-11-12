enum PaymentMethod {
  CreditCard = 'Credit Card',
  Cheque = 'Cheque',
  CMD = 'CMD',
  Cash = 'Cash',
}

enum PaymentType {
  CustomPayment = 'Custom Payment',
  OutstandingBalance = 'Outstanding Balance',
  CoPay = 'Co-Pay',
  CoIns = 'Co-Ins',
  PaymentPlan = 'Payment Plan',
}

interface ChargePaymentParams {
  appointmentId: string | number
  cardKey?: string
  cardId?: string
  paymentDescription: string
  patientId: string
  amount: string | number
  paymentMethod: string
  paymentType: string
  isOtherPayment: boolean
}

enum AppointmentOptionType {
  CoPay = 'CoPay',
  CoInsurance = 'CoInsurance',
}

interface UseAppointmentOptionParams {
  patientId: string
  paymentType: AppointmentOptionType
  disabled?: boolean
}

export {
  PaymentMethod,
  PaymentType,
  AppointmentOptionType,
  type ChargePaymentParams,
  type UseAppointmentOptionParams,
}
