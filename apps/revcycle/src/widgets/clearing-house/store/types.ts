import { CodeSetState } from '@psychplus/codeset'
import {
  EDIItem,
  InsurancePayer,
  ReceiverItem,
  InsurancePayerList,
  ReceiverList,
} from '../clearing-house-insurance-plan-edi/components/types'

interface SubmitterSetState extends CodeSetState {
  receiverList: ReceiverItem[]
  insurancePayerList: InsurancePayer[]
  ediRecords: EDIItem[]
  insurancePayerOptions: InsurancePayerList[],
  receiverOptions: ReceiverList[],
  setReceiverList: (receiverList: ReceiverItem[]) => void
  setInsurancePayerList: (insurancePayerList: InsurancePayer[]) => void
  setEDIRecords: (ediRecords: EDIItem[]) => void
  setInsurancePayerOptions: (insurancePayerOptions: InsurancePayerList[]) => void,
  setReceiverOptions: (receiverOptions: ReceiverList[]) => void,
}

export type { SubmitterSetState }
