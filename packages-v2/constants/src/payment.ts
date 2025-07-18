enum PaymentType {
  Insurance = 'Insurance',
  SelfPay = 'Self Pay',
  PreferredPartner= 'Preferred Partner'
}

enum PaymentResponsibilityTypeCode {
  PreferredPartner = 'PreferredPartner',
  Insurance = 'Insurance',
  SelfPay = 'SelfPay',
}

const INSURANCE_INFO = "We'll verify your insurance coverage and communicate any co-pays ahead of your first session. Many of our clients pay as little as $0!"
const SELF_PAY_INFO = "We ask for a credit card for any co-pays you might have with your insurance. We'll communicate any charges not covered by your insurance ahead of your first session, and only charge you after you meet with your clinician."

export { PaymentType, INSURANCE_INFO, SELF_PAY_INFO, PaymentResponsibilityTypeCode }
