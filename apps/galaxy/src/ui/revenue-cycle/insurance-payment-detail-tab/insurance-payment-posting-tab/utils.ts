import {
  ClaimPayment,
  ClaimServiceLinePayment,
  InsurancePayment,
} from '../../types'
import { removeNegative } from './cells/utils'
import { DEFAULT_ADJUSTMENT_TYPE } from './constants'

interface ValidatePaymentParams {
  paymentDetail: InsurancePayment
  claimPayment: Partial<ClaimPayment>
}
const validatePayment = ({
  claimPayment,
  paymentDetail,
}: ValidatePaymentParams): string => {
  if (!claimPayment.claimServiceLinePayments) return ''

  const checkAmount = paymentDetail.amount
  let totalPaid = 0
  const serviceLineAmountExceeded: number[] = []
  const amountAdjustedEqually: number[] = []
  const allowedAmountMissing: number[] = []
  for (const [
    index,
    serviceLine,
  ] of claimPayment.claimServiceLinePayments.entries()) {
    if (serviceLine.rectificationId) continue
    const allowedAmount = serviceLine.allowedAmount
      ? +serviceLine.allowedAmount
      : 0
    const billedAmount = parseFloat(serviceLine.billedAmount)
    const paidAmount = serviceLine.paidAmount
      ? parseFloat(removeNegative(serviceLine.paidAmount))
      : 0

    totalPaid += paidAmount
    if (totalPaid > checkAmount)
      return 'Sum of all the amounts in service lines should not exceed the check amount'

    if (!serviceLine.serviceLinePaymentAdjustments) continue

    // need to check for allowed amount if theirs even one adjustment exists other than denial
    const otherAdjustment = serviceLine.serviceLinePaymentAdjustments
      .filter((adj) => adj.recordStatus !== 'Inactive')
      .every(
        (adjustment) =>
          adjustment.adjustmentStatus === DEFAULT_ADJUSTMENT_TYPE
      )

    if (
      serviceLine.serviceLinePaymentAdjustments.length > 0 &&
      !otherAdjustment &&
      !allowedAmount
    ) {
      allowedAmountMissing.push(index + 1)
    }

    const sumOfAdjustments = serviceLine.serviceLinePaymentAdjustments.reduce(
      (acc, adj) =>
        adj.recordStatus !== 'Inactive' ? acc + adj.adjustmentAmount : acc,
      0,
    )
    const totalPaidForServiceLine =
      +removeNegative(`${sumOfAdjustments}`) + paidAmount

    if (totalPaidForServiceLine > billedAmount && allowedAmount) {
      serviceLineAmountExceeded.push(index + 1)
    }

    const sumOfAmounts =
      totalPaidForServiceLine + +removeNegative(serviceLine.otherPr)
    if (sumOfAmounts.toFixed(2) !== billedAmount.toFixed(2) && allowedAmount) {
      amountAdjustedEqually.push(index + 1)
    }
  }

  if (serviceLineAmountExceeded.length > 0) {
    return `Sum of all the amounts should not exceed billed amount - Service Line (${serviceLineAmountExceeded.join(
      ', ',
    )})`
  }

  if (amountAdjustedEqually.length > 0) {
    return `Billed Amount is not adjusted properly - Service Line (${amountAdjustedEqually.join(
      ', ',
    )})`
  }

  if (allowedAmountMissing.length > 0) {
    return `Allowed amount is missing - Service Line (${allowedAmountMissing.join(
      ', ',
    )})`
  }

  return ''
}

const rectifiedRowExists = (
  claimServiceLinePayments: ClaimServiceLinePayment[],
): boolean => claimServiceLinePayments.some((row) => row['isRectifiedRow'])

export { validatePayment, rectifiedRowExists }
