import { ClaimPayment, InsurancePayment } from '../../types'
import { removeNegative } from './cells/utils'

interface ValidatePaymentParams {
  paymentDetail: InsurancePayment
  claimPayment: Partial<ClaimPayment>
}

const validatePayment = ({
  claimPayment,
  paymentDetail,
}: ValidatePaymentParams): string => {
  if (!claimPayment.claimServiceLinePayments) return ''

  // validation for sum of all the amounts should not exceed the checkamount
  const checkAmount = paymentDetail.amount

  let checkAmountExceeded = ''
  let totalPaid = 0
  for (const serviceLine of claimPayment.claimServiceLinePayments) {
    if (!serviceLine.serviceLinePaymentAdjustments) continue

    const sumOfAdjustments = serviceLine.serviceLinePaymentAdjustments.reduce(
      (acc, adj) =>
        adj.recordStatus !== 'Inactive' ? acc + adj.adjustmentAmount : acc,
      0,
    )
    const paidAmount = parseFloat(serviceLine.paidAmount)
    const sumOfPaid = sumOfAdjustments + paidAmount

    totalPaid += sumOfPaid

    if (totalPaid > checkAmount) {
      checkAmountExceeded = `Sum of all the amounts in service lines should not exceed the check amount`
      break
    }
  }

  if (checkAmountExceeded) return checkAmountExceeded

  // validation for service lines the sum of all amounts should not exceed the billed amount
  const serviceLineAmountExceeded: number[] = []

  for (const [
    index,
    serviceLine,
  ] of claimPayment.claimServiceLinePayments.entries()) {
    if (!serviceLine.serviceLinePaymentAdjustments) continue

    const sumOfAdjustments = serviceLine.serviceLinePaymentAdjustments.reduce(
      (acc, adj) =>
        adj.recordStatus !== 'Inactive' ? acc + adj.adjustmentAmount : acc,
      0,
    )
    const allowedAmount = +serviceLine.allowedAmount
    const billedAmount = parseFloat(serviceLine.billedAmount)
    const paidAmount = parseFloat(removeNegative(serviceLine.paidAmount))
    const totalPaid = +removeNegative(`${sumOfAdjustments}`) + paidAmount

    if (totalPaid > billedAmount && allowedAmount) {
      serviceLineAmountExceeded.push(index + 1)
    }
  }

  if (serviceLineAmountExceeded.length > 0)
    return `Sum of all the amounts should not exceed billed amount - Service Line (${serviceLineAmountExceeded.join(
      ', ',
    )})`

  // need to check if sum of all the amounts are equal to billed amount
  const amountAdjustedEqually: number[] = []

  for (const [
    index,
    serviceLine,
  ] of claimPayment.claimServiceLinePayments.entries()) {
    if (!serviceLine.serviceLinePaymentAdjustments) continue

    const sumOfAdjustments =
      serviceLine.serviceLinePaymentAdjustments.reduce(
        (acc, adj) =>
          adj.recordStatus !== 'Inactive' ? acc + adj.adjustmentAmount : acc,
        0,
      ) ?? 0

    const allowedAmount = +serviceLine.allowedAmount
    const billedAmount = parseFloat(serviceLine.billedAmount)
    const sumOfAmounts =
      +removeNegative(`${sumOfAdjustments}`) +
      +removeNegative(serviceLine.paidAmount) +
      +removeNegative(serviceLine.otherPr)

    if (sumOfAmounts.toFixed(2) !== billedAmount.toFixed(2) && allowedAmount) {
      amountAdjustedEqually.push(index + 1)
    }
  }

  if (amountAdjustedEqually.length > 0)
    return `Billed Amount is not adjusted properly - Service Line (${amountAdjustedEqually.join(
      ', ',
    )})`

  return ''
}

export { validatePayment }
