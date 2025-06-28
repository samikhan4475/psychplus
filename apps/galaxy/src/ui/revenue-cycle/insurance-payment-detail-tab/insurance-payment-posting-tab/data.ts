import { ClaimServiceLine } from '@/types'
import {
  ClaimPayment,
  ClaimServiceLinePayment,
  UpdateClaimPaymentPayload,
} from '../../types'
import { PaymentListTypes } from '../types'
import { allowedAmountKeys, PROCESSED_AS_REVERSAL } from './constants'

const transformServiceLines = (
  serviceLines: ClaimServiceLinePayment[] | ClaimServiceLine[],
  paymentPostingClaim: Partial<ClaimPayment>,
  processedAsCode?: string,
) =>
  serviceLines?.map((serviceLine) => ({
    ...serviceLine,
    chargeId: serviceLine.chargeId ?? '',
    claimPaymentId: paymentPostingClaim.claimId ? paymentPostingClaim.id : '',
    dateOfServiceFrom: serviceLine.dateOfServiceFrom ?? '',
    dateOfServiceTo: serviceLine.dateOfServiceTo ?? '',
    claimServiceLineId: serviceLine.claimServiceLineId,
    billedAmount:
      String(serviceLine.totalAmount ?? '') ||
      String(serviceLine.billedAmount ?? ''),
    allowedAmount: allowedAmountKeys.includes(processedAsCode ?? '')
      ? String(serviceLine.billedAmount)
      : String(serviceLine.allowedAmount ?? ''),
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
  }))

const transformInDefault = (
  paymentPostingId: string,
  paymentPostingClaim?: Partial<ClaimPayment>,
) => {
  if (!paymentPostingClaim) return {}
  const serviceLines =
    paymentPostingClaim?.claimServiceLinePayments ??
    paymentPostingClaim?.claimServiceLines ??
    []
  const claimServiceLinePayments = transformServiceLines(
    serviceLines,
    paymentPostingClaim,
  )

  return {
    ...paymentPostingClaim,
    claimServiceLinePayments,
    id: paymentPostingClaim.claimId ? paymentPostingClaim.id : '',
    recordStatus: 'Active',
    paymentId: paymentPostingId,
    dateOfServiceFrom: new Date(paymentPostingClaim?.dateOfServiceFrom ?? ''),
    dateOfServiceTo: new Date(paymentPostingClaim?.dateOfServiceTo ?? ''),
    claimId: paymentPostingClaim?.claimId ?? paymentPostingClaim.id ?? '',
    paymentSource: paymentPostingClaim.paymentSource ?? 'Primary',
    processedAsCode:
      paymentPostingClaim.processedAsCode ?? 'ProcessedAsPrimary',
    insuranceInternalControlNumber:
      paymentPostingClaim.insuranceInternalControlNumber ?? '',
    status: paymentPostingClaim.status ?? PaymentListTypes.Unposted,
    billedAmount: String(paymentPostingClaim.billedAmount ?? '0'),
    allowedAmount: String(paymentPostingClaim.allowedAmount ?? '0'),
    paidAmount: String(paymentPostingClaim.paidAmount ?? '0'),
    copayAmount: String(paymentPostingClaim.copayAmount ?? '0'),
    coinsuranceAmount: String(paymentPostingClaim.coinsuranceAmount ?? '0'),
    deductibleAmount: String(paymentPostingClaim.deductibleAmount ?? '0'),
    otherPr: String(paymentPostingClaim.otherPr ?? '0'),
    writeOffAmount: String(paymentPostingClaim.writeOffAmount ?? '0'),
  }
}

const transformOut = (
  claimPayment: Partial<ClaimPayment>,
  paymentClaim?: Partial<ClaimPayment>,
): UpdateClaimPaymentPayload => {
  const insurancePolicies: Record<string, string> = {
    ProcessedAsPrimary: paymentClaim?.primaryPatientInsurancePolicyId ?? '',
    ProcessedAsSecondary: paymentClaim?.secondaryPatientInsurancePolicyId ?? '',
    ProcessedAsTertiary: paymentClaim?.tertiaryPatientInsurancePolicyId ?? '',
    ProcessedAsPrimaryAndForwarded:
      paymentClaim?.primaryPatientInsurancePolicyId ?? '',
    ProcessedAsSecondaryAndForwarded:
      paymentClaim?.secondaryPatientInsurancePolicyId ?? '',
    ProcessedAsTertiaryAndForwarded:
      paymentClaim?.tertiaryPatientInsurancePolicyId ?? '',
  }

  const insurancePolicyId =
    insurancePolicies[claimPayment.processedAsCode ?? ''] ||
    (paymentClaim?.insurancePolicyId ?? '') ||
    insurancePolicies[`ProcessedAs${claimPayment.paymentSource}`]

  const updatedModel: UpdateClaimPaymentPayload = {
    ...claimPayment,
    id: claimPayment.id ? claimPayment.id : null,
    insurancePolicyId,
    claimServiceLinePayments:
      claimPayment.claimServiceLinePayments?.map((serviceLine) => ({
        ...serviceLine,
        billedAmount: +serviceLine.billedAmount,
        allowedAmount: +serviceLine.allowedAmount,
        paidAmount: +serviceLine.paidAmount,
        copayAmount: +serviceLine.copayAmount,
        coinsuranceAmount: +serviceLine.coinsuranceAmount,
        deductibleAmount: +serviceLine.deductibleAmount,
        otherPr: +serviceLine.otherPr,
        writeOffAmount: +serviceLine.writeOffAmount,
        serviceLinePaymentAdjustments:
          serviceLine.serviceLinePaymentAdjustments?.map((adj) => ({
            ...adj,
            claimServiceLinePaymentId:
              serviceLine.id ?? serviceLine.claimServiceLineId ?? null,
          })) ?? [],
      })) ?? [],
    dateOfServiceFrom:
      new Date(claimPayment.dateOfServiceFrom ?? '').toISOString() ?? '',
    dateOfServiceTo:
      new Date(claimPayment.dateOfServiceTo ?? '').toISOString() ?? '',
  }

  if (updatedModel.processedAsCode === PROCESSED_AS_REVERSAL)
    delete updatedModel.insurancePolicyId

  if (!updatedModel.id) {
    updatedModel.claimServiceLinePayments?.forEach((serviceLine) => {
      delete serviceLine['claimPaymentId']
      delete serviceLine['id']
    })
  }
  return updatedModel
}

export { transformInDefault, transformOut, transformServiceLines }
