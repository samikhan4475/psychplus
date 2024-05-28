interface PreferredPartnerPatientFilterState {
  partnerIds: string[]
  name: string
  mrnList: string[]
  dateFrom: string | Date | null
  dateTo: string | Date | null
  userStatusList: string[]
}

export type { PreferredPartnerPatientFilterState }
