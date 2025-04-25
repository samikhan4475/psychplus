import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/client-actions'
import { AppointmentParams } from '@/ui/schedule/types'
import { getDateString } from '@/ui/schedule/utils'
import { updateFollowupDenialStatus } from '../actions'
import { FOLLOW_UP_DENIED_REASON_ERROR } from '../constants'
import {
  getCalendarDateTimeFromUTC,
  getDefaultNext,
  isFollowupScheduled,
} from '../utils'

interface StoreState {
  quickNoteAppointment?: Appointment
  data?: Appointment[]
  setData: (
    appointmentData: Appointment | undefined,
    data: Appointment[],
  ) => void
  loading: boolean
  error?: string
  isFollowupDenied: boolean
  fetchQuickNoteAppointment: (
    patientId: string,
    appointmentId: string,
  ) => Promise<void>
  followupDenialReason: string
  followupDenialReasonError?: string
  isFollowupExists: boolean
  payload?: AppointmentParams
  appointmentDate?: string
  search: (payload: AppointmentParams) => void
  setIsFollowupDenied: (val: boolean) => void
  setFollowupDenialReason: (val: string) => void
  setIsFollowupExists: (val: boolean) => void
  setAppointmentDate: (val: string) => void
  updateFollowupDenialStatus: ({
    appointmentId,
    shouldValidate,
    shouldShowToast,
  }: {
    appointmentId: number
    shouldValidate?: boolean
    shouldShowToast?: boolean
  }) => Promise<void>
  resetError: () => void
  isFollowupDeniedWithoutReason: () => boolean
  isFollowupDeniedWithReason: () => boolean
  isFollowupRequired: () => boolean
  getAutoFollowupDate: (
    visitTypeCode: string,
    isServiceTimeDependent: boolean,
  ) => string | undefined
}

const useStore = create<StoreState>((set, get) => ({
  quickNoteAppointment: undefined,
  data: [],
  loading: false,
  error: undefined,
  isFollowupDenied: false,
  followupDenialReason: '',
  followupDenialReasonError: undefined,
  isFollowupExists: false,
  appointmentDate: undefined,
  setData: (appointmentData, data) =>
    set({
      data,
      isFollowupExists: isFollowupScheduled(appointmentData, data),
    }),
  fetchQuickNoteAppointment: async (
    patientId: string,
    appointmentId: string,
  ) => {
    set({ error: undefined, loading: true })
    const result = await getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to fetch appointment data')
      return set({
        error: result.error,
        loading: false,
        data: [],
      })
    }
    const appointment = result.data[0]
    set({
      quickNoteAppointment: appointment,
      appointmentDate: appointment.appointmentDate,
      followupDenialReason: appointment.followUpDenialReason ?? '',
      isFollowupDenied: appointment.isFollowupDenied ?? false,
      loading: false,
    })
  },

  search: async (payload: AppointmentParams) => {
    set({ error: undefined, loading: true, payload })

    const result = await getBookedAppointmentsAction({
      ...payload,
      isFollowUp: true,
      isShowActiveVisits: true,
    })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
        data: [],
      })
    }
    const { quickNoteAppointment } = get()
    const isFollowupExists = quickNoteAppointment
      ? isFollowupScheduled(quickNoteAppointment, result.data)
      : false
    set({
      data: result.data,
      loading: false,
      isFollowupExists,
    })
  },

  setIsFollowupDenied: (val) => {
    set({
      isFollowupDenied: val,
    })
  },

  setFollowupDenialReason: (val) => {
    set({
      followupDenialReason: val,
    })
  },

  setAppointmentDate: (val) => {
    set({
      appointmentDate: val,
    })
  },

  setIsFollowupExists: (val) => {
    set({
      isFollowupExists: val,
    })
  },

  updateFollowupDenialStatus: async ({
    appointmentId,
    shouldValidate = true,
    shouldShowToast = true,
  }) => {
    const { isFollowupDenied, followupDenialReason } = get()
    if (shouldValidate && isFollowupDenied && !followupDenialReason) {
      set({
        followupDenialReasonError: FOLLOW_UP_DENIED_REASON_ERROR,
      })
      return
    }
    const response = await updateFollowupDenialStatus(appointmentId, {
      isFollowupDenied,
      followupDenialReason,
    })
    set({
      followupDenialReasonError: undefined,
    })
    if (response.state === 'error') {
      toast.error(response.error || 'Failed to save followup denial reason')
      return
    }
    if (shouldShowToast) {
      toast.success('Followup denial reason saved!')
    }
  },

  resetError: () => {
    set({
      followupDenialReasonError: undefined,
    })
  },

  isFollowupDeniedWithoutReason: () => {
    const { isFollowupDenied, followupDenialReason } = get()
    const isDeniedWithoutReason = isFollowupDenied && !followupDenialReason

    if (isDeniedWithoutReason) {
      set({
        followupDenialReasonError: FOLLOW_UP_DENIED_REASON_ERROR,
      })
    }

    return isDeniedWithoutReason
  },

  isFollowupDeniedWithReason: () => {
    const { isFollowupDenied, followupDenialReason } = get()
    return isFollowupDenied && !!followupDenialReason
  },

  isFollowupRequired: () => {
    const { isFollowupDenied, isFollowupExists } = get()
    return !isFollowupDenied && !isFollowupExists
  },

  getAutoFollowupDate: (visitTypeCode, isServiceTimeDependent) => {
    const [offset, type] = getDefaultNext(
      visitTypeCode,
      isServiceTimeDependent,
    ).split(' ')
    const appointmentDate = get().appointmentDate
    const calendarDateTime = getCalendarDateTimeFromUTC(appointmentDate)
    const fourteenDaysFromAppointmentDate = calendarDateTime?.add(
      type === 'week'
        ? {
            weeks: +offset,
          }
        : { days: +offset },
    )
    return getDateString(fourteenDaysFromAppointmentDate)
  },
}))

export { useStore }
