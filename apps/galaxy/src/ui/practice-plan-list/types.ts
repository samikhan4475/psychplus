import { DateValue } from 'react-aria-components'
import { Metadata, SelectOptionType } from '@/types'

interface InsurancePlanItem {
  id: string
  practiceId: string
  insurancePlanId: string
  effectiveDate: string
  isRevalidationRequired: boolean | number
  isProviderRevalidationRequired: boolean | number
  revalidationDate: string
  insurancePlanName: string
  payerName: string
  planStatus: boolean | number
  planType: string
  recordStatus: string
  networkStatus: string
  metadata: Metadata
}

interface InsurancePlanItemPayload
  extends Omit<InsurancePlanItem, 'effectiveDate' | 'revalidationDate'> {
  effectiveDate: DateValue | string | null
  revalidationDate: DateValue | string | null
}

interface GetPlanListResponse {
  insurancePlanList: InsurancePlanItem[]
  total: number
}

interface InsurancePlanListSearchParams {
  recordStatuses: string[]
  payerName: string
  insurancePlanName: string
  effectiveDate: string | null
  fromDate: string | null
  toDate: string | null
  planStatus: boolean
}

interface SelectPayerOption extends SelectOptionType {
  payerType: string
  payerName: string
  payerId: string
}

export {
  type InsurancePlanItem,
  type InsurancePlanItemPayload,
  type GetPlanListResponse,
  type InsurancePlanListSearchParams,
  type SelectPayerOption,
}
