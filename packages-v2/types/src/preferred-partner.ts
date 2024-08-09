enum MembershipType {
  Plus = 'Plus',
  Basic = 'Basic',
}

enum PaymentType {
  CoPay = 'CoPay',
  CoInsurance = 'CoInsurance',
  CoPayAndCoInsurance = 'CoPayAndCoInsurance',
  OutstandingBalance = 'OutstandingBalance',
  CustomPayment = 'CustomPayment',
  PaymentPlan = 'PaymentPlan',
  PlusMembership = 'PlusMembership',
  Insurance = 'Insurance',
  SelfPay = 'SelfPay',
}

enum PreferredPartnerUserStatus {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Unknown = 'Unknown',
}

enum PreferredPartnerUserType {
  Individual = 'Individual',
  Couple = 'Couple',
  Family = 'Family',
  Unknown = 'Unknown',
}

interface PreferredPartner {
  id?: string
  name?: string
  subscriptionStatus: MembershipType
  payerStatus: PaymentType
  userNumber: number
  userStatus: PreferredPartnerUserStatus
  userType: PreferredPartnerUserType
  isPrimaryPartner: boolean
  addDate: string
  termDate: string
  totalIds?: number
}

export type { PreferredPartner }
