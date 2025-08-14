'use server'

import * as api from '@/api'
import { Appointment, UserResponse } from '@/types'
import { sanitizeFormData } from '@/utils'
import { NOTE_TITLE_CODE, NOTE_TYPE_CODE } from './constants'
import { NoShowFormData, NoShowNoteParams } from './ns-popup/types'
import { buildEncounterDetailsFromForm } from './utils'

const setNoShowStatusAction = async (
  appointment: Appointment,
  data: NoShowFormData,
  user: UserResponse,
) => {
  const sanitizedData = sanitizeFormData(data)
  const payload = buildEncounterDetailsFromForm(sanitizedData)
  const dateTime = new Date().toISOString()

  const finalPayload: NoShowNoteParams = {
    patientId: appointment.patientId,
    appointmentId: appointment.appointmentId,
    signedByUserId: user.id,
    noteTypeCode: NOTE_TYPE_CODE,
    noteTitleCode: NOTE_TITLE_CODE,
    secondaryNoteCreationDateTimeByUser: dateTime,
    encounterSignedNoteDetails: payload,
  }

  if (user.staffId === appointment.providerId) {
    finalPayload.signedDate = dateTime
  }

  const response = await api.POST(
    api.CREATE_NOTE_ENDPOINT(
      String(appointment.patientId),
      String(appointment.appointmentId),
    ),
    finalPayload,
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
      billingHistories: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { setNoShowStatusAction }
