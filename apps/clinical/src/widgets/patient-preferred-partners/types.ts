interface PatientPreferredPartner {
  id: string
  name: string
  subscriptionStatus: string
  payerStatus: string
  userNumber: number
  userStatus: string
  userType: string
  isPrimaryPartner: boolean
  addDate: string
  termDate: string
  totalIds: number
}

export type { PatientPreferredPartner }
