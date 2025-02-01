import {
  ClaimServiceLinePayment,
  ServiceLinePaymentAdjustment,
} from '@/ui/revenue-cycle/types'
import { PaymentAdjustment } from '../../types'
import {
  DEDUCTIBLE_ADJUSTMENT,
  DEFAULT_ADJUSTMENT_TYPE,
  WRITE_OFF_ADJUSTMENT,
} from '../constants'

const amountRegex = /^\d{0,3}(\.\d{0,2})?$/
const negativeAmountRegex = /^-?\d{0,3}(\.\d{0,2})?$/
const specialKeys = ['Backspace', 'Tab', 'Control', 'Shift', 'Alt']

const getNegativeRow = (
  row: ClaimServiceLinePayment,
): ClaimServiceLinePayment => ({
  ...row,
  isNegativeRow: true,
  allowedAmount: -row.allowedAmount + '',
  paidAmount: -row.paidAmount + '',
  copayAmount: -row.copayAmount + '',
  coinsuranceAmount: -row.coinsuranceAmount + '',
  deductibleAmount: -row.deductibleAmount + '',
  writeOffAmount: -row.writeOffAmount + '',
  otherPr: -row.otherPr + '',
  serviceLinePaymentAdjustments:
    row.serviceLinePaymentAdjustments?.map((adjustment) => ({
      ...adjustment,
      adjustmentAmount: adjustment.adjustmentAmount * -1,
    })) ?? [],
})

const removeNegative = (amount: string) => amount?.replace(/-/g, '') ?? amount
const addDefaultNegative = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target
  if (value && !value.startsWith('-')) {
    event.target.value = '-' + value
  }
}
const amountCheck = (
  e: React.KeyboardEvent<HTMLInputElement>,
  allowNegative?: boolean,
) => {
  const newValue = e.currentTarget.value + e.key
  if (specialKeys.includes(e.key)) return
  const validationRegex = allowNegative ? negativeAmountRegex : amountRegex
  if (!newValue.startsWith('-') && allowNegative) {
    e.currentTarget.value = '-'
  }
  if (!validationRegex.test(newValue)) return e.preventDefault()
}

interface AdjustmentParams {
  serviceLinePaymentAdjustments: ServiceLinePaymentAdjustment[]
  billedAmount?: string
  allowedAmount?: string
  claimPayment: ClaimServiceLinePayment
  claimPaymentId?: string
  defaultAdjustmentAmount?: number
}
interface AdjustmentType extends Partial<AdjustmentParams> {
  adjustmentGroupCode: string
  adjustmentReasonCode: string
  remarkCode?: string
  adjustmentAmount?: number
  adjustmentStatus?: string
}

const getOtherWriteOff = (
  serviceLinePaymentAdjustments?: ServiceLinePaymentAdjustment[],
) =>
  serviceLinePaymentAdjustments
    ?.reduce(
      (acc, adjustment) =>
        adjustment.adjustmentGroupCode !==
          WRITE_OFF_ADJUSTMENT.adjustmentGroupCode &&
        adjustment.recordStatus !== 'Inactive' &&
        adjustment.adjustmentReasonCode !==
          WRITE_OFF_ADJUSTMENT.adjustmentReasonCode
          ? acc + +adjustment.adjustmentAmount
          : acc,
      0,
    )
    ?.toFixed(2) ?? 0

const updateOrAddAdjustment = ({
  adjustmentGroupCode,
  adjustmentReasonCode,
  adjustmentAmount,
  remarkCode,
  adjustmentStatus,
  serviceLinePaymentAdjustments,
}: AdjustmentType) => {
  if (!adjustmentGroupCode || !adjustmentReasonCode || !adjustmentAmount)
    return serviceLinePaymentAdjustments

  const parsedAdjustmentAmount = isNaN(adjustmentAmount) ? 0 : adjustmentAmount

  const existingAdjustmentIndex = (
    serviceLinePaymentAdjustments ?? []
  ).findIndex(
    (adj) =>
      adj.adjustmentGroupCode === adjustmentGroupCode &&
      adj.adjustmentReasonCode === adjustmentReasonCode,
  )

  if (existingAdjustmentIndex !== -1) {
    return serviceLinePaymentAdjustments?.map((adj, index) =>
      index === existingAdjustmentIndex
        ? {
            ...adj,
            adjustmentAmount: parsedAdjustmentAmount,
          }
        : adj,
    )
  } else {
    const newAdjustment = {
      adjustmentAmount: parsedAdjustmentAmount,
      adjustmentGroupCode,
      adjustmentReasonCode,
      remarkCode: remarkCode ?? '',
      adjustmentStatus,
      recordStatus: 'Active',
    }

    return [...(serviceLinePaymentAdjustments ?? []), newAdjustment]
  }
}

const handleAdjustment = ({
  serviceLinePaymentAdjustments,
  adjustmentGroupCode,
  adjustmentReasonCode,
  adjustmentAmount,
  remarkCode,
  claimPaymentId,
}: AdjustmentType) => {
  const existingAdjustment = serviceLinePaymentAdjustments?.find(
    (adjustment) =>
      adjustment.adjustmentGroupCode === adjustmentGroupCode &&
      adjustment.adjustmentReasonCode === adjustmentReasonCode &&
      adjustment.recordStatus !== 'Inactive',
  )

  const newAdjustment = {
    adjustmentGroupCode,
    adjustmentReasonCode,
    adjustmentAmount: adjustmentAmount ?? 0,
    claimServiceLinePaymentId: claimPaymentId ?? '',
    remarkCode: remarkCode ?? '',
    recordStatus: 'Active',
  }

  const updatedAdjustments = existingAdjustment
    ? serviceLinePaymentAdjustments?.map((adjustment) =>
        adjustment.adjustmentGroupCode === adjustmentGroupCode &&
        adjustment.adjustmentReasonCode === adjustmentReasonCode &&
        adjustment.recordStatus !== 'Inactive'
          ? { ...adjustment, ...newAdjustment }
          : adjustment,
      )
    : [...(serviceLinePaymentAdjustments ?? []), newAdjustment]
  return updatedAdjustments
}

const addInsuranceAdjustment = ({
  serviceLinePaymentAdjustments,
  adjustmentGroupCode,
  adjustmentReasonCode,
  remarkCode,
  adjustmentAmount,
}: AdjustmentType) => {
  if (adjustmentAmount === 0) return serviceLinePaymentAdjustments
  return handleAdjustment({
    serviceLinePaymentAdjustments,
    adjustmentGroupCode,
    adjustmentReasonCode,
    remarkCode,
    adjustmentAmount,
  })
}

const removeInsuranceAdjustment = ({
  serviceLinePaymentAdjustments,
  adjustmentGroupCode,
  adjustmentReasonCode,
}: AdjustmentType) => {
  const clonedAdjustments = structuredClone(serviceLinePaymentAdjustments)

  return clonedAdjustments?.map((adjustment) =>
    adjustment.adjustmentGroupCode === adjustmentGroupCode &&
    adjustment.adjustmentReasonCode === adjustmentReasonCode &&
    adjustment.recordStatus !== 'Inactive'
      ? { ...adjustment, recordStatus: 'Inactive' }
      : adjustment,
  )
}

const calculateBalanceAmount = (
  serviceLinePayment: ClaimServiceLinePayment,
) => {
  const balance =
    +serviceLinePayment.allowedAmount -
    +serviceLinePayment.paidAmount -
    +serviceLinePayment.otherPr
  const otherAdjustments =
    serviceLinePayment.serviceLinePaymentAdjustments?.reduce(
      (acc, adj) =>
        (adj.adjustmentGroupCode ===
          DEDUCTIBLE_ADJUSTMENT.adjustmentGroupCode ||
          adj.adjustmentStatus === DEFAULT_ADJUSTMENT_TYPE ||
          adj.adjustmentStatus === 'PatientResponsibility') &&
        adj.recordStatus !== 'Inactive'
          ? acc + adj.adjustmentAmount
          : acc,
      0,
    ) ?? 0

  return (balance - otherAdjustments).toFixed(2)
}

interface AdjustmentStatusParams {
  adjustmentCodes: PaymentAdjustment[]
  adjustmentGroupCode: string
  adjustmentReasonCode: string
}
const getAdjustmentStatus = ({
  adjustmentCodes,
  adjustmentGroupCode,
  adjustmentReasonCode,
}: AdjustmentStatusParams): string =>
  adjustmentCodes.find(
    (code) =>
      code.groupCode === adjustmentGroupCode &&
      code.reasonCode === adjustmentReasonCode,
  )?.adjustmentStatus ?? DEFAULT_ADJUSTMENT_TYPE

export {
  getNegativeRow,
  amountCheck,
  getOtherWriteOff,
  addInsuranceAdjustment,
  getAdjustmentStatus,
  addDefaultNegative,
  updateOrAddAdjustment,
  calculateBalanceAmount,
  removeInsuranceAdjustment,
  removeNegative,
}
