import { ClaimPayment, InsurancePayment } from '../../types'

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

  for (const serviceLine of claimPayment.claimServiceLinePayments) {
    if (!serviceLine.serviceLinePaymentAdjustments) continue

    const sumOfAdjustments = serviceLine.serviceLinePaymentAdjustments.reduce(
      (acc, adj) =>
        adj.recordStatus !== 'Inactive' ? acc + adj.adjustmentAmount : acc,
      0,
    )
    const paidAmount = parseFloat(serviceLine.paidAmount)
    const totalPaid = sumOfAdjustments + paidAmount

    if (totalPaid > checkAmount) {
      checkAmountExceeded = `Sum of all the amounts in service lines should not exceed the check amount`
      break
    }
  }

  if (checkAmountExceeded) return checkAmountExceeded

  // validation for service lines the sum of all amounts should not exceed the billed amount
  let serviceLineAmountExceeded = ''

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
    const billedAmount = parseFloat(serviceLine.billedAmount)
    const paidAmount = parseFloat(serviceLine.paidAmount)
    const totalPaid = sumOfAdjustments + paidAmount

    if (totalPaid > billedAmount) {
      serviceLineAmountExceeded = `Sum of all the amounts should not exceed billed amount - Service Line (${
        index + 1
      })`
      break
    }
  }

  if (serviceLineAmountExceeded) return serviceLineAmountExceeded

  // need to check if sum of all the amounts are equal to billed amount

  let amountAdjustedEqually = ''

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
    const billedAmount = parseFloat(serviceLine.billedAmount)
    const sumOfAmounts =
      +sumOfAdjustments + +serviceLine.paidAmount + +serviceLine.otherPr

    if (sumOfAmounts.toFixed(2) !== billedAmount.toFixed(2)) {
      amountAdjustedEqually = `Billed Amount is not adjusted properly - Service Line (${
        index + 1
      })`
      break
    }
  }

  if (amountAdjustedEqually) return amountAdjustedEqually

  return ''
}

export { validatePayment }
