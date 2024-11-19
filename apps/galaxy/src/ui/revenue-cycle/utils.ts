import { ClaimInsurancePolicy } from '@/types'

const getInsurancePayerName = (
  type: string,
  policies: ClaimInsurancePolicy[],
) => {
  const policy = policies.find(
    (policy) => policy.insurancePolicyPriority === type,
  )
  return policy ? policy.policyName : ''
}

export { getInsurancePayerName }
const truncateString = (str: string, length: number) =>
  str.length > length ? `${str.slice(0, length)}...` : str

const previewFile = async <TBody>(
  endpoint: string | URL,
  filename: string,
  method: 'GET' | 'POST' = 'GET',
  bodyData?: TBody,
) => {
  const options: RequestInit = {
    method,
    body: JSON.stringify(bodyData),
    headers: { 'Content-Type': 'application/json' },
  }
  const result = await fetch('/ehr' + endpoint, options)
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  const blob = await result.blob()
  const url = window.URL.createObjectURL(blob)
  window.open(url, '_blank')
  window.URL.revokeObjectURL(url)
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export { truncateString, previewFile, formatAmount }
