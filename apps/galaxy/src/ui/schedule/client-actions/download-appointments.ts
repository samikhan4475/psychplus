'use client'

import toast from 'react-hot-toast'
import { DOWNLOAD_LIST_VIEW_DATA } from '@/api/endpoints'
import { downloadFile } from '@/utils/download'
import { SCHEDULER_PAGE_SIZE_LIMIT } from '../constants'
import { AppointmentParams } from '../types'
import { FileTypes } from '@/types'

interface DownloadActionParams {
  type: FileTypes
  params?: AppointmentParams
  page?: number
}

const downloadAppointmentsAction = async ({
  type,
  params,
  page,
}: DownloadActionParams) => {
  const body = {
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeSpecialist: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includeCptCodes: true,
    includePatientNotes: true,
    includePatientTransactions: true,
    ...params,
  }

  const pageSize = page ? SCHEDULER_PAGE_SIZE_LIMIT : 0
  const pages = page ? page : 1
  const offset = (pages - 1) * pageSize
  const url = `${DOWNLOAD_LIST_VIEW_DATA}/${type}?limit=${pageSize}&offset=${offset}`
  try {
    await downloadFile<AppointmentParams>(url, 'scheduler-data', 'POST', body)
  } catch (err) {
    toast.error('Failed to download schedule data')
  }
}

export { downloadAppointmentsAction }
