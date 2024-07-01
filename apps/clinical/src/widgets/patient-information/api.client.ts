'use client'

import { PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createFileHeaders, createHeaders } from '@psychplus/utils/client'
import { Patient, PatientConsentRequestBody } from './types'

interface UpdateProfileProps extends PatientParams {
  body: Patient
}

interface RequestPolicyConsentProps extends PatientParams {
  body: PatientConsentRequestBody
}

interface ImageUploadProps extends PatientParams {
  file: File
}

const updateProfile = ({
  patientId,
  body,
}: UpdateProfileProps): Promise<Patient> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/profile`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )

const requestPatientConsent = ({
  patientId,
  body,
}: RequestPolicyConsentProps) =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/consents/actions/sendnotice`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )

const updateProfileImage = ({ patientId, file }: ImageUploadProps) => {
  const formData = new FormData()
  formData.append('file', file)
  return handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/profileimage`, {
      method: 'PATCH',
      headers: createFileHeaders(),
      body: formData,
    }),
  )
}

const updateDriversLicenseImage = ({ patientId, file }: ImageUploadProps) => {
  const formData = new FormData()
  formData.append('file', file)
  return handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/driverslicenseimage/front`, {
      method: 'PATCH',
      headers: createFileHeaders(),
      body: formData,
    }),
  )
}

export {
  updateProfile,
  requestPatientConsent,
  updateProfileImage,
  updateDriversLicenseImage,
}
