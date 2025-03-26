'use server'

import * as api from '@/api'
import { ApiResponse, PatientLink } from '@/types'
import { getMaskedPhoneNumber, getPatientPhone } from '@/utils'

const getPatientLinksAction = async (
  patientId: string,
  isCheckPatientAsNonSurvivor?: boolean,
): Promise<api.ActionResult<PatientLink[]>> => {
  const url = new URL(api.GET_PATIENT_LINKS(patientId))
  url.searchParams.append('offset', String(0))
  url.searchParams.append('limit', String(0))
  url.searchParams.append('orderBy', 'asc')
  url.searchParams.append(
    'isCheckPatientAsNonSurvivor',
    String(isCheckPatientAsNonSurvivor ?? false),
  )
  const response = await api.GET<ApiResponse[]>(url.toString())

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = mapApiResponseToTableFormat(response.data)
  return {
    state: 'success',
    data: transformedData,
  }
}

const mapApiResponseToTableFormat = (
  apiResponse: ApiResponse[],
): PatientLink[] => {
  return apiResponse.map((item) => ({
    id: item.id,
    mrn: item?.nonSurvivorPatientId?.toString() ?? '',
    phone: item?.nonSurvivorPatientContactDetails?.phoneNumbers
      ? getMaskedPhoneNumber(
          getPatientPhone(
            item?.nonSurvivorPatientContactDetails?.phoneNumbers,
          ) ?? '',
        )
      : '',
    email: item?.nonSurvivorPatientContactDetails?.email ?? '',
    status: item?.nonSurvivorPatientStatus,
    scheduleMessagingOrders: '',
    signIn: '',
    nonSurvivorPatientId: item.nonSurvivorPatientId,
    survivorPatientId: item.survivorPatientId,
    recordStatus: item.recordStatus,
    survivorPatientName: item.survivorPatientName,
    nonSurvivorPatientName: item.nonSurvivorPatientName,
  }))
}

export { getPatientLinksAction }
