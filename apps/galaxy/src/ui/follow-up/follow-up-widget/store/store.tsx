import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/client-actions'
import { AppointmentParams } from '@/ui/schedule/types'
import { getDateString } from '@/ui/schedule/utils'
import { updateFollowupDenialStatus } from '../actions'
import { FOLLOW_UP_DENIED_REASON_ERROR } from '../constants'
import { getCalendarDateTimeFromUTC, getDefaultNext } from '../utils'

interface StoreState {
  data?: Appointment[]
  setData: (data: Appointment[]) => void
  loading: boolean
  error?: string
  isFollowupDenied: boolean
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
  getAutoFollowupDate: (visitTypeCode: string) => string | undefined
}

const useStore = create<StoreState>((set, get) => ({
  data: [],
  loading: false,
  error: undefined,
  isFollowupDenied: false,
  followupDenialReason: '',
  followupDenialReasonError: undefined,
  isFollowupExists: false,
  appointmentDate: undefined,
  setData: (data) =>
    set({
      data,
      isFollowupExists: data.length > 0,
    }),

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

    set({
      data: result.data,
      loading: false,
      isFollowupExists: result.data.length > 0,
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

  getAutoFollowupDate: (visitTypeCode) => {
    const defaultFollowupWeeks = getDefaultNext(visitTypeCode).split(' ')[0]
    const appointmentDate = get().appointmentDate
    const calendarDateTime = getCalendarDateTimeFromUTC(appointmentDate)
    const fourteenDaysFromAppointmentDate = calendarDateTime?.add({
      weeks: +defaultFollowupWeeks,
    })
    return getDateString(fourteenDaysFromAppointmentDate)
  },
}))

export { useStore }
