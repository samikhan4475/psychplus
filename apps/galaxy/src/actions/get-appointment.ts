'use server'

import * as api from '@/api'
import { Appointment } from '@/types'
interface AppointmentParams {
  id: string
  shouldHaveCode?: boolean
  shouldHaveCosigners?: boolean
  shouldHaveLocation?: boolean
  shouldHaveNoteSigner?:boolean
}

const getAppointment = async ({
  id,
  shouldHaveCode = false,
  shouldHaveCosigners = false,
  shouldHaveLocation = false,
  shouldHaveNoteSigner=false
}: AppointmentParams): Promise<api.ActionResult<Appointment>> => {
  const url = new URL(api.GET_APPOINTMENT(id))
  if (shouldHaveCode) url.searchParams.append('isIncludeCodes', 'true')
  if (shouldHaveCosigners) url.searchParams.append('isIncludeCosigners', 'true')
  if (shouldHaveLocation) url.searchParams.append('isIncludeLocation', 'true')
  if(shouldHaveNoteSigner) url.searchParams.append('isIncludeSignedNotes','true')

  const response = await api.GET<Appointment>(url.toString())
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

export { getAppointment }
