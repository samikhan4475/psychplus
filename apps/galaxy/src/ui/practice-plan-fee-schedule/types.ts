interface FeeSchedule {
  id: string
  cpt: string
  description: string
  mdDo: string
  np: string
  pa: string
  psyD: string
  masters: string
  status: string
  paymentResponsibility: string
  edit: boolean
}

interface GetStaffListResponse {
  feeSchedules: FeeSchedule[]
  total: number
}

interface StaffSearchParams {
  partialShortName?: string
}

export type { FeeSchedule, GetStaffListResponse, StaffSearchParams }
