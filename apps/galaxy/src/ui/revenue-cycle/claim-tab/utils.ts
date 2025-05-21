import { Claim, InsurancePolicyPriority } from '@/types'

const allowedStatuses = new Set([
  'Submitted',
  'BilledToPrimary',
  'BilledToSecondary',
  'Denied',
  'DeniedPrimary',
  'DeniedSecondary',
  'DeniedTertiary',
  'Rejected',
  'RejectedPrimary',
  'RejectedSecondary',
  'RejectedTertiary',
])

const getExcludedPolicies = (claim: Claim) => {
  const excludedOptions: string[] = []
  const statusMap = {
    [InsurancePolicyPriority.Primary]: claim?.primaryStatusCode,
    [InsurancePolicyPriority.Secondary]: claim?.secondaryStatusCode,
    [InsurancePolicyPriority.Tertiary]: claim?.tertiaryStatusCode,
  }

  for (const [level, status] of Object.entries(statusMap)) {
    if (!status || !allowedStatuses.has(status)) {
      excludedOptions.push(level)
    }
  }

  return excludedOptions
}

export { getExcludedPolicies }
