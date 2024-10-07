'use client'

import { Row } from '@tanstack/react-table'
import { PatientAddress } from '@/types'

interface InsuranceParams {
  payerName: string
  insurancePlanId: string
  effectiveDate: string
  terminationDate: string
  memberId: string
  groupNumber: string
  isPatientPolicyHolder: boolean
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  policyHolderName?: {
    firstName: string
    lastName: string
  }
  policyHolderGender?: string
  policyHolderPriority?: string
  policyHolderDateOfBirth?: string
  policyHolderRelationship?: string
  policyHolderSocialSecurityNumber?: string
  isActive: boolean
  id?: string
  isDeleted?: boolean
  policyHolderStreetAddress?: string
  policyHolderStreetAddress2?: string
  policyHolderCity?: string
  policyHolderState?: string
  policyHolderPostalCode?: string
  verificationStatus?: string
  contactInfo?: {
    addresses: PatientAddress[]
  }
}

interface InsuranceHistoryParams {
  historyCreatedFrom?: string
  historyCreatedTo?: string
  username?: string
}
interface InsuranceTag {
  id: string
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
}

interface AuthTable {
  date: string
  time: string
  staff: string
  type: string
  cptCode: string
  start: string
  end: string
  visits: string
  remaining: string
  provider: string
  pos: string
  status: string
  auth: string
  attach?: string
}
interface EligibilityTable {
  date: string
  time: string
  serviceTo: string
  serviceFrom: string
  provider: string
  payer: string
}
type InsurranceRow = Row<AuthTable>
interface GetInsurranceResponse {
  auth: AuthTable[]
}

interface InsuranceHistoryData {
  dateTime: string
  username: string
}

interface EligibilityResponseTable {
  inNetwork: string
  coverageLevel: string
  amount: string
  message: string
  facilityType: string
}

export type {
  AuthTable,
  InsuranceTag,
  EligibilityTable,
  InsurranceRow,
  GetInsurranceResponse,
  InsuranceHistoryData,
  EligibilityResponseTable,
  InsuranceParams,
  InsuranceHistoryParams,
}
