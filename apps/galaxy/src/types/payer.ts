import { Metadata } from './metadata'

interface PayerPlan {
  id: string
  payerName?: string
  payerType?: string
  payerStatus?: string
  name?: string
}

interface PayerPlanResponse {
  id: string
  metadata?: Metadata
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerId: string
  payerType: string
  payerName: string
  payerTypeDescription: string
}
interface PayerPlanListResponse {
  payerplanslist: PayerPlanResponse[]
  total: number
}
interface PayerPlanFilter {
  name: string
  includeTest: boolean
  recordStatuses: string[]
  isPlanStatusActive: boolean
  isIncludePayer: boolean
  payerName: string
  payerType: string
  payerStatus: string
}

interface AddPayerPlan {
  id?: string
  payerId: string
  payerType: string
  name: string
  payerStatus: string
  payerName?: string
  isTest?: boolean
  isPublicViewable?: boolean
  providerPortalUrl?: string
  claimProcessingPhoneNumber?: string
  credentialOrContractingPhoneNumber?: string
  networkRepresentativeName?: string
  claimProcessingFaxNumber?: string
  credentialOrContractingEmail?: string
  networkRepresentativeEmail?: string
  isActive?: boolean
}
interface UpdatePayerPlan {
  id: string
  payerId: string
  payerType: string
  name: string
  payerStatus: string
  payerName?: string
  isTest?: boolean
  isPublicViewable?: boolean
  providerPortalUrl?: string
  claimProcessingPhoneNumber?: string
  credentialOrContractingPhoneNumber?: string
  networkRepresentativeName?: string
  claimProcessingFaxNumber?: string
  credentialOrContractingEmail?: string
  networkRepresentativeEmail?: string
  isActive?: boolean
}

interface GetPayerList {
  id: string
  metadata: Metadata
  name: string
}

interface AddPayer {
  id?: string
  name: string
}
interface PayerPlanAddress {
  id: string
  type: string
  street1: string
  street2: string
  city: string
  state: string
  postalCode: string
  zipLast4?: string
  status: string
}

interface Address {
  type?: string
  street1?: string
  street2?: string
  city?: string
  state?: string
  postalCode?: string
  zipLast4?: string
}

interface PayerPlanAddressResponse {
  id: string
  metadata?: Metadata
  isDefaultLocation: boolean
  recoredStatus: string
  address: Address
}
export type {
  PayerPlan,
  PayerPlanAddress,
  PayerPlanResponse,
  PayerPlanFilter,
  PayerPlanListResponse,
  AddPayerPlan,
  UpdatePayerPlan,
  GetPayerList,
  AddPayer,
  PayerPlanAddressResponse,
}
