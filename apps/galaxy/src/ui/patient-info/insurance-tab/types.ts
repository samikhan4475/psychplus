'use client'

import { Row } from '@tanstack/react-table'

interface InsurancePayer {
  id: string
  name: string
  plans?: InsurancePlan[]
}

interface InsurancePlan {
  id: string
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
}

interface Insurance {
  id: string
  insurancePlanId: string
  verificationStatus: string
  isActive: boolean
  memberId: string
  groupNumber: string
  effectiveDate: string
  terminationDate: string
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isPatientPolicyHolder: boolean
  policyHolderRelationship?: string
  policyHolderName?: {
    firstName: string
    lastName: string
    middleName?: string
  }
  policyHolderDateOfBirth?: string
  policyHolderSocialSecurityNumber?: string
  policyHolderGender?: string
  policyHolderPriority?: string
  policyName: string
  payerName: string
  isDeleted: boolean
}

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
  InsurancePayer,
  InsurancePlan,
  Insurance,
  AuthTable,
  InsuranceTag,
  EligibilityTable,
  InsurranceRow,
  GetInsurranceResponse,
  InsuranceHistoryData,
  EligibilityResponseTable,
  InsuranceParams,
}
