import { ClaimInsurancePolicy, SharedCode } from '@/types'

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
  returnUrl?: boolean,
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
  const pdfBlob = new Blob([blob], { type: 'application/pdf' })
  const url = window.URL.createObjectURL(pdfBlob)
  if (returnUrl) {
    return url
  }
  window.open(url, '_blank')
  window.URL.revokeObjectURL(url)
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

function getRandomId() {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0]
}

function addSpaceToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}

const getClaimStatusDisplay = (codes: SharedCode[], claimStatusCode: string) =>
  claimStatusCode
    ? codes.find((code) => code.value === claimStatusCode)?.display ??
      claimStatusCode
    : claimStatusCode

const getClaimStatuses = (codes: SharedCode[]) =>
  codes.map((code) => code.value)



export {
  truncateString,
  getClaimStatusDisplay,
  previewFile,
  formatAmount,
  getRandomId,
  addSpaceToCamelCase,
  getClaimStatuses,
}
