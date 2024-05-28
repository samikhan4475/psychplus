import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { type CareTeam, type Patient, type PatientParams } from './types'

const getLoggedInPatientProfile = async (): Promise<Patient> =>
  handleRequest(
    fetch('/api/patients/self/profile', {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatientProfileImage = async (patientId?: number) => {
  const url = patientId
    ? `/api/patients/${patientId}/profile`
    : '/api/patients/self/profileimage'

  const response = await fetch(url, {
    cache: 'no-store',
    headers: createHeaders(),
  })

  if (response.ok) {
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return url
  }

  return 'Patient does not have a photo assigned'
}

const getLoggedInPatientCareTeam = async (): Promise<CareTeam> =>
  handleRequest(
    fetch('/api/patients/self/careteam', {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatients = async (payload?: {
  firstNameContains: string
  lastNameContains: string
  dateOfBirth: string
}): Promise<Patient[]> =>
  handleRequest(
    fetch(`/api/patients/search`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(payload || {}),
      headers: createHeaders(),
    }),
  )

const getLoggedInPatientProfileCached = cache(getLoggedInPatientProfile)

const getLoggedInPatientCareTeamCached = cache(getLoggedInPatientCareTeam)

const getPatientProfileImageCached = cache(getPatientProfileImage)

export {
  getLoggedInPatientProfileCached as getLoggedInPatientProfile,
  getLoggedInPatientCareTeamCached as getLoggedInPatientCareTeam,
  getPatientProfileImageCached as getPatientProfileImage,
  getPatients,
}
