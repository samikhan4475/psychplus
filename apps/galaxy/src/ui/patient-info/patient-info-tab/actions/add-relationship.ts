'use server'

import * as api from '@/api'
import { LegalName, PatientAddress, PhoneNumber } from '@/types'

interface AddRelationshipRequestBody {
  patientId: number
  name: Partial<LegalName>
  isEmergencyContact: boolean
  isAllowedToReleaseInformation: boolean
  isGuardian: boolean
  contactDetails: {
    email: string
    phoneNumbers: Partial<PhoneNumber>[]
    addresses: Partial<PatientAddress>[]
  }
  guardianRelationshipCode: string
}

const addPatientRelationshipAction = async (
  patientId: string,
  relationship: AddRelationshipRequestBody,
) => {
  const result = await api.POST(
    api.ADD_PATIENT_RELATIONSHIP_ENDPOINT(patientId),
    relationship,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { addPatientRelationshipAction, type AddRelationshipRequestBody }
