'use client'

import * as api from '@/api/api.client'
import { GET_FACILITY_ADMISSION_DATA } from '@/api/endpoints'
import { FacilityAdmissionRecord, SelectOptionType } from '@/types'

interface FacilityAdmissionParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientIdList?: number[]
}

const getFacilityAdmissionIdsOptions = async (
  params?: FacilityAdmissionParams,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const seen = new Set()
  const response = await api.POST<FacilityAdmissionRecord[]>(
    GET_FACILITY_ADMISSION_DATA,
    params ?? {},
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response.data
    .map((data) => ({
      value: data.id,
      label: data.facilityAdmissionSequenceNumber.toString(),
    }))
    .filter((data) => {
      if (!seen.has(data.value)) {
        seen.add(data.value)
        return true
      }
      return false
    })

  return {
    state: 'success',
    data: transformedData,
  }
}
export { getFacilityAdmissionIdsOptions }
