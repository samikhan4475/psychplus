interface UploadInsuranceCardParams {
  file: File
  policyId: string
  side: 'Front' | 'Back'

  isUnAuthenticated?: boolean
  shortUrlReference?: string
}

const uploadInsuranceCard = (
  params: UploadInsuranceCardParams,
  headers: HeadersInit = {},
) => {
  const { isUnAuthenticated, shortUrlReference } = params
  const data = new FormData()
  data.append('file', params.file)
  const url = isUnAuthenticated
    ? `/api/patients/unauthenticated/policies/${params.policyId}/cardimage/${params.side}/${shortUrlReference}`
    : `/api/patients/self/policies/${params.policyId}/cardimage/${params.side}`

  return fetch(url, {
    method: 'PATCH',
    body: data,
    headers,
  })
}

export { uploadInsuranceCard }
