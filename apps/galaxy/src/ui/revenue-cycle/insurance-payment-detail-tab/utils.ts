import { SharedCode } from '@/types'
import {
  ClaimPayment,
  ClaimServiceLinePayment,
  ServiceLinePaymentAdjustment,
} from '../types'
import { getClaimStatusDisplay } from '../utils'
import { adjustmentMapping } from './insurance-payment-posting-tab/constants'
import { PaymentAdjustment } from './types'

interface TransformInServiceLinesParams {
  serviceLines: ClaimServiceLinePayment[]
  adjustmentCodes: PaymentAdjustment[]
}

const transformInClaimPayments = (
  claimStatusCodes: SharedCode[],
  payments: ClaimPayment[],
) =>
  payments?.map((payment) => ({
    ...payment,
    claimStatusCode: getClaimStatusDisplay(
      claimStatusCodes,
      payment.claimStatusCode,
    ),
  })) ?? []
const sortByCptCode = (
  a: ClaimServiceLinePayment,
  b: ClaimServiceLinePayment,
) => (a.cptCode < b.cptCode ? -1 : 1)

const transformInServiceLines = ({
  serviceLines,
  adjustmentCodes,
}: TransformInServiceLinesParams) => {
  const getAdjustmentStatus = (adjustment: ServiceLinePaymentAdjustment) => {
    const matchingCode = adjustmentCodes.find(
      (code) =>
        code.groupCode === adjustment.adjustmentGroupCode &&
        code.reasonCode === adjustment.adjustmentReasonCode &&
        adjustment.recordStatus !== 'Inactive' &&
        !adjustmentMapping[
          `${adjustment.adjustmentGroupCode}_${adjustment.adjustmentReasonCode}`
        ],
    )
    return matchingCode?.adjustmentStatus ?? ''
  }

  const updateAdjustments = (serviceLine: ClaimServiceLinePayment) =>
    serviceLine.serviceLinePaymentAdjustments?.map(
      (adjustment: ServiceLinePaymentAdjustment) => ({
        ...adjustment,
        adjustmentStatus: getAdjustmentStatus(adjustment),
      }),
    )

  const updatedServiceLines = serviceLines
    ?.toSorted(sortByCptCode)
    ?.map((serviceLine) => ({
      ...serviceLine,
      billedAmount:
        String(serviceLine.totalAmount ?? '') ||
        String(serviceLine.billedAmount ?? ''),
      allowedAmount: String(serviceLine.allowedAmount ?? ''),
      modifierCode1: serviceLine.modifierCode1 ?? '',
      modifierCode2: serviceLine.modifierCode2 ?? '',
      modifierCode3: serviceLine.modifierCode3 ?? '',
      modifierCode4: serviceLine.modifierCode4 ?? '',
      paidAmount: String(serviceLine.paidAmount ?? ''),
      copayAmount: String(serviceLine.copayAmount ?? ''),
      coinsuranceAmount: String(serviceLine.coinsuranceAmount ?? ''),
      deductibleAmount: String(serviceLine.deductibleAmount ?? ''),
      otherPr: String(serviceLine.otherPr ?? ''),
      writeOffAmount: String(serviceLine.writeOffAmount ?? ''),
      serviceLinePaymentAdjustments: updateAdjustments(serviceLine),
    }))

  return updatedServiceLines
}

const getPaymentDisplay = (
  codeValue: string,
  codeSets: SharedCode[],
): string | undefined => {
  const codeSetLookup = codeSets.reduce((lookup, code) => {
    lookup[code.value] = code.display
    return lookup
  }, {} as Record<string, string>)

  return codeSetLookup[codeValue] ?? codeValue
}

export {
  getPaymentDisplay,
  sortByCptCode,
  transformInServiceLines,
  transformInClaimPayments,
}
