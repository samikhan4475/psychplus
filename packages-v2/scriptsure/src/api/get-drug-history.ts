import * as api from '@psychplus-v2/api'
import { SCRIPTSURE_APP_URL } from '@psychplus-v2/env'
import { scriptSurePatientLogin } from '@psychplus-v2/scriptsure'
import type { PatientProfile } from '@psychplus-v2/types'
import { getUserFullName } from '@psychplus-v2/utils'
import { getCookie } from '../cookies'
import type { DrugHistory } from '../types'

const getDrugHistory = async (
  profile: PatientProfile,
): Promise<DrugHistory[]> => {
  let session = getCookie() || null

  if (!session) {
    session = await scriptSurePatientLogin(
      String(profile.id),
      getUserFullName(profile.legalName),
    )

    if (!session) {
      return []
    }
  }

  const drugHistoryResponse = await api.GET<DrugHistory[]>(
    `${SCRIPTSURE_APP_URL}/v1.0/drughistory/medication/${session.patientId}?sessiontoken=${session.sessionToken}`,
    { ignoreHeaders: true },
  )

  if (drugHistoryResponse.state === 'error') {
    throw new Error(drugHistoryResponse.error)
  }
  return drugHistoryResponse.data
}

export { getDrugHistory }
