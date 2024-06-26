interface BillingAddress {
  type?: string
  street1?: string | null
  street2?: string | null
  city: string
  state: string
  country?: string | null
  postalCode: string
}

interface MetaData {
  createdOn: Date
  createdBy: number
  createdByFullName: string
  updatedOn: Date
  updatedBy: number
  updatedByFullName: string
  deletedOn: Date
  deletedBy: number
  deletedByFullName: string
}

interface CreditCard {
  id: number
  metadata: MetaData
  patientId: number
  cardType: string
  name: string
  numberLastFour: string
  cvv: number
  isActive: boolean
  isPrimary: boolean
  expireMonth: 0
  expireYear: 0
  billingAddress: BillingAddress
  cardKey: string
  preferredPartnerId: string
}

interface CreditCardPayload {
  cardType: string
  name: string
  numberLastFour: number
  cvv: number
  isActive: boolean
  isPrimary: boolean
  expireMonth: number
  expireYear: number
  billingAddress?: BillingAddress
  cardKey: string
  preferredPartnerId: string
}

interface SubscriptionHistory {
  date: Date
  chargeType: string
  billingFrequency: string
  paymentDescription: string
  totalChargeAmount: number
  transactionId: string
}

interface PatientName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates: GeoCoordinates
}

interface PhoneNumber {
  type: string
  number: string
  extension: string
  comment: string
}

interface ContactDetails {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
  isMailingAddressSameAsPrimary: true
}

interface PreferredPartner {
  id: string
  metadata: MetaData
  name: string
  individualRate: number
  coupleRate: number
  familyRate: number
  subscriptionStatus: string
  payerStatus: string
  billingFrequency: string
  plusChargeAmount: number
  serviceChargeAmount: number
  startDate: Date
  nextPaymentDate: Date
  contactDetails: ContactDetails
  recordStatus: string
  isTest: boolean
  totalUser: number
  totalIds: number
  familiesCount: number
  couplesCount: number
  individualsCount: number
  paymentStatus: string
}

interface PatientTransactions {
  id: number
  metadata: MetaData
  patientId: number
  chargeDate: Date
  transactionNumber: string
  type: string
  description: string
  appointmentId: number
  visitNumber: string
  coPayDue: number
  coPayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  unappliedPayment: number
  method: string
  stripeNumber: string
  paymentDescription: string
  patientName: PatientName
  preferredPartnerId: string
  isPreferredPartnerTransaction: boolean
  is_active: boolean
}

interface ServicesHistoryPayload {
  patientIds?: number[]
  startDate: string
  endDate: string
  transactionTypes: string[]
  preferredPartnerIds: string[]
  preferredPartnerId: string
}

interface ServicesHistory {
  totalDue: number
  balance: number
  unappliedPayment: number
  totalPayment: number
  preferredPartnerId: string
  preferredPartner: PreferredPartner
  patientTransactions: PatientTransactions[]
}

interface UnpaidAppointment {
  app_id: number
  providerName: string
  appointmentDateTime: string
  coPayAmount: string
  coInsuranceAmount: string
}

interface UnpaidAppointmentPayload {
  patientId: number
  paymentType: string
}

interface PatientLegalName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface PatientInfo {
  id: number
  verificationStatus: string
  userId: number
  legalName: PatientLegalName
  birthdate: string
  gender: string
  genderOrientation: string
  genderExpression: string
  genderPronoun: string
}

interface FormSelectOption {
  value: string
  label: string
}

interface PatientTransactionHistory {
  id: number
  appointmentId: number
  transactionDate: string
  transactionTime: string
  appointmentStatus: string
  charge: string
  isCustomCharge: boolean
  visitNumber: string
  description: string
  coPayDue: number
  coPayPaid: number
  coInsDue: number
  coInsPaid: number
  balanceDue: number
  balancePaid: number
  showBalanceStatus: boolean
  actionBy: string
  actionDate: string
  method: string
  paymentDescription: string
  stripePaymentKey: string
  transactionNumber: string
}

interface ChargePayment {
  id?: number
  patientId: number
  appointmentId: number
  paymentType: string
  amount?: number
  paymentDateTime: string
  isActive?: boolean
  cardId?: string
  cardKey?: string
  transactionKey?: string
  isOtherPayment?: boolean
  paymentMethod?: string
  paymentDescription?: string
  stripeAmountCaptured?: number
  stripeChargeCreatedOn?: string
  isStripeChargeCaptured?: boolean
  isPaymentRefund?: boolean
  preferredPartnerId?: string
  isPreferredPartnerPayment?: boolean
}

interface SelectedAppointment {
  paymentType: string
  appointmentId: number
}

interface CustomChargePayload {
  chargeDate: string
  transactionNumber: string
  type: string
  description: string
  appointmentId: string
  visitNumber: string
  coPayDue?: string
  coPayPaid?: number
  coInsuranceDue?: number
  coInsurancePaid?: number
  balanceDue?: number
  balancePaid?: number
  preferredPartnerId: string
  isPreferredPartnerTransaction: boolean
  patientId: number
}

export type {
  CreditCard,
  CreditCardPayload,
  SubscriptionHistory,
  ServicesHistory,
  UnpaidAppointment,
  UnpaidAppointmentPayload,
  PatientInfo,
  FormSelectOption,
  PatientTransactionHistory,
  ChargePayment,
  SelectedAppointment,
  PatientTransactions,
  ServicesHistoryPayload,
  CustomChargePayload,
}
