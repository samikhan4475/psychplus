interface UploadPolicyParams {
  file: File
  policyId: string
  patientId:string
  side: 'Front' | 'Back'
}

const uploadPolicyImage = (params: UploadPolicyParams) => {
  const data = new FormData()
  data.append('file', params.file)

  return fetch(
    `/ehr/api/patients/${params.patientId}/policies/${params.policyId}/cardimage/${params.side}`,
    {
      method: 'PATCH',
      body: data,
    },
  )
}

export { uploadPolicyImage }
