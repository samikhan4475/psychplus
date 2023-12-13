interface FeeSchedule {
  id: string
  name: string
  effectiveDate: string
  termDate: string
  isActive: boolean
}

interface Insurance {
  id: string
  name: string
  plans: InsurancePlan[]
  metadata?: Metadata
}

interface InsurancePlan {
  id: string
  name: string
  payerType: string
  isActive: boolean
  isTest: boolean
  metadata?: Metadata
}

interface Metadata {
  [key: string]: string | undefined
}

interface CptCode {
  id: string
  code: string
  description: string
  type: string
  isActive: boolean
  createdBy: string
}

interface Procedure extends CptCode {
  price: number
}

export type { FeeSchedule, Procedure, Insurance, InsurancePlan, CptCode }
