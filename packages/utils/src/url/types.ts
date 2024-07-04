interface SearchParams {
  [key: string]: string | undefined
}

interface ScheduleFeeSearchParams {
  payerId?: string
  IsPreferredPartnerFeeSchedule: boolean
}

export type { SearchParams, ScheduleFeeSearchParams }
