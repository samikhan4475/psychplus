interface UploadInsuranceCardParams {
  file: File
  policyId: string
  side: 'Front' | 'Back'
}

const uploadInsuranceCard = (params: UploadInsuranceCardParams, headers: HeadersInit = {}) => {
  const data = new FormData()
  data.append('file', params.file)

  return fetch(
    `/api/patients/self/policies/${params.policyId}/cardimage/${params.side}`,
    {
      method: 'PATCH',
      body: data,
      headers
    },
  )
}

export { uploadInsuranceCard }
