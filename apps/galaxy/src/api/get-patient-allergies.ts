import * as api from '@/api'
import {
  AllergyDataResponse,
  GetPatientAllergiesParams,
} from '@/ui/allergy/patient-allergies-widget/types'

const getPatientAllergies = async ({
  payload,
}: GetPatientAllergiesParams): Promise<
  api.ActionResult<AllergyDataResponse[]>
> => {
  const response = await api.POST<AllergyDataResponse[]>(
    api.GET_ALLERGIES_ENDPOINT,
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
    data: response.data,
  }
}

export { getPatientAllergies }
