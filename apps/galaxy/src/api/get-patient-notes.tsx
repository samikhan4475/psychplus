import * as api from '@/api'
import {
  GetPatientNotesParams,
  GetPatientNotesResponse,
  PatientNotes,
} from '@/ui/notes/types'

const getPatientNotes = async (
  payload: GetPatientNotesParams,
): Promise<api.ActionResult<GetPatientNotesResponse>> => {
  const response = await api.POST(
    `${api.GET_DETAILED_NOTE_ENDPOINT(payload.patientId)}`,
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
      notes: response.data as PatientNotes[],
    },
  }
}

export { getPatientNotes }
