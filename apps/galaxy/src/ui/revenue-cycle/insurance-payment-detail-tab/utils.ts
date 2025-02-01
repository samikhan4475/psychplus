import { SharedCode } from '@/types'
import {
  ClaimPayment,
  ClaimServiceLinePayment,
  InsurancePayment,
  ServiceLinePaymentAdjustment,
} from '../types'
import { getClaimStatusDisplay } from '../utils'
import { adjustmentMapping } from './insurance-payment-posting-tab/constants'
import { PaymentAdjustment } from './types'

interface TransformInPaymentParams {
  paymentDetail: InsurancePayment
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

const transformInPayment = ({
  paymentDetail,
  adjustmentCodes,
}: TransformInPaymentParams) => {
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
  const updatedPayments = paymentDetail.claimPayments?.map((payment) => ({
    ...payment,
    claimServiceLinePayments: payment.claimServiceLinePayments
      ?.toSorted(sortByCptCode)
      .map((serviceLine: ClaimServiceLinePayment) => ({
        ...serviceLine,
        serviceLinePaymentAdjustments:
          adjustmentCodes.length > 0
            ? updateAdjustments(serviceLine)
            : serviceLine.serviceLinePaymentAdjustments,
      })),
  }))

  return { ...paymentDetail, claimPayments: updatedPayments }
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

export { getPaymentDisplay, transformInPayment, transformInClaimPayments }
