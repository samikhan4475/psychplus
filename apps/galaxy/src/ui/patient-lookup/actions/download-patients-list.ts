'use client'

import toast from 'react-hot-toast'
import { DOWNLOAD_PATIENTS_LIST_VIEW_DATA } from '@/api/endpoints'
import { FileTypes } from '@/types'
import { downloadFile } from '@/utils/download'
import { SearchPatientsParams } from '../types'

interface DownloadActionParams {
  type: FileTypes
  params?: SearchPatientsParams
  page?: number
}

const downloadPatientsListAction = async ({
  type,
  params,
  page,
}: DownloadActionParams) => {
  const body = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeTestPatients: true,
    isIncludeInsurance: true,
    isIncludeInsuranceVerification: true,
    isIncludeCardVerification: true,
    isIncludeConsentVerification: true,
    isIncludeMostUpcomingAppointment: true,
    isIncludeMostRecentAppointment: true,
    isIncludePatientLastLogin: true,
    ...params,
  }

  const pageSize = page ? 100 : 0
  const pages = page ? page : 1
  const offset = (pages - 1) * pageSize
  const url = `${DOWNLOAD_PATIENTS_LIST_VIEW_DATA}/${type}?limit=${pageSize}&offset=${offset}`
  try {
    await downloadFile<SearchPatientsParams>(url, 'patients-data', 'POST', body)
  } catch (err) {
    toast.error('Failed to download Patients data')
  }
}

export { downloadPatientsListAction }
