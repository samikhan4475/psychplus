'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NoteSectionItem } from '../types'

interface NoteDetailsPayload {
  patientId: number
  appointmentId?: number
  sectionName: string[]
  isWithAppointmentNull?: boolean
  historyCreatedFrom?: string
  isLatest?: boolean
}

const getNoteDetails = async (
  noteDetails: NoteDetailsPayload,
): Promise<ActionResult<NoteSectionItem[]>> => {
  const payload: NoteDetailsPayload = {
    patientId: Number(noteDetails.patientId),
    sectionName: noteDetails.sectionName,
    isLatest: true,
  }

  if (noteDetails?.appointmentId)
    payload.appointmentId = noteDetails.appointmentId

  if (!noteDetails?.isWithAppointmentNull)
    payload.isWithAppointmentNull = noteDetails.isWithAppointmentNull

  const result = await api.POST<NoteSectionItem[]>(
    `${API_URL}/api/patients/self/notedetails/actions/search`,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      ...payload,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { getNoteDetails }
