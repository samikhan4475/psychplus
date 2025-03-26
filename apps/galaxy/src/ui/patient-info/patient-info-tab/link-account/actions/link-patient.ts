'use server'

import * as api from '@/api'
import { AddLinkAccountListResponse } from '@/types'

interface SectionInformation {
  sectionName: string;
  selectedPatientId: string;
}

interface LinkPatientAccountActionParams {
  survivorPatientId: string
  nonSurvivorPatientId: string
  payload?: SectionInformation[]
}

const LinkPatientAccountAction = async ({
  survivorPatientId,
  nonSurvivorPatientId,
  payload,
}: LinkPatientAccountActionParams) => {
  const response = await api.POST<AddLinkAccountListResponse>(
    api.LINK_PATIENT_ACCOUNT(survivorPatientId, nonSurvivorPatientId),
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      note: response.data,
    },
  }
}

export { LinkPatientAccountAction }
