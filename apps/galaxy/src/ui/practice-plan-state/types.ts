import { Metadata } from '@/types'

interface PracticePlan {
  practicePlanId: string
  stateCode: string
  recordStatus: string
  display?:string
  metadata?: Metadata
}

export { type PracticePlan }
