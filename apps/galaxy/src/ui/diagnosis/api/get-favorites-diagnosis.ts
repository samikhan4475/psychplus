import * as api from '@/api'
import { FavouriteDiagnosisData, Metadata } from '@/types'
import { getAuthCookies } from '@/utils/auth'

interface FavouriteDiagnosisDataResponse {
  id: number
  metadata: Metadata
  icd10Code: string
  description: string
  isFavourite: boolean
  priorityFavourite: number
  patientId: number
  priorityCheck: number
  recordStatus: string
}

const getFavouriteDiagnosisAPI = async (
  value?: string,
): Promise<api.ActionResult<FavouriteDiagnosisData[]>> => {
  const auth = getAuthCookies()
  const response = await api.POST<FavouriteDiagnosisDataResponse[]>(
    api.SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
    {
      staffId: auth?.user.userId,
      CodeOrDescription: value,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const optionsData = response.data.map(
    (item: {
      icd10Code: string
      description: string
      id: number
      isFavourite: boolean
    }) => ({
      description: `${item.icd10Code} ${item.description}`,
      id: item.id,
      isFavourite: item.isFavourite,
      icd10Code: item.icd10Code,
    }),
  )

  return {
    state: 'success',
    data: optionsData,
  }
}

export { getFavouriteDiagnosisAPI }
