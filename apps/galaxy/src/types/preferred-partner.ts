interface PatientPreferredPartner {
  id: string
  name: string
  premiumStatus?: string
  subscriptionStatus: string
  payerStatus: string
  userID: string
  userType: string
  isPrimaryPartner: boolean
  usersInID: string
  userStatus: string
  startDate: string
  endDate: string
  termDate: string
  addDate: string
  priority: string
  totalIds: number
}

export type { PatientPreferredPartner }
