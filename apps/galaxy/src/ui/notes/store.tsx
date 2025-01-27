import { create } from 'zustand'
import { getAppointment } from '@/actions'
import { Appointment, PatientProfile, StaffResource } from '@/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { getBookedAppointmentsAction } from '../schedule/actions'
import {
  getNoteDetailsAction,
  GetNoteDetailsParams,
  getPatientNotesAction,
} from './actions'
import { getAddendumDetailsAction } from './actions/get-addendum'
import { getWidgetsArrayByVisitType } from './note-detail/utils'
import type {
  Addendum,
  GetPatientNotesParams,
  GetPatientNotesResponse,
  NoteDetail,
  NoteDocuments,
  PatientNotes,
  WidgetType,
} from './types'

interface Store {
  patientId: string
  appointmentId: string
  data?: GetPatientNotesResponse
  loading?: boolean
  loadingDetail?: boolean
  error?: string
  appointment?: Appointment
  appointments?: Appointment[]
  noteDetail?: NoteDetail
  allergies?: Allergy[]
  widgets: WidgetType[]
  patient?: PatientProfile
  documents?: NoteDocuments
  cosigner?: StaffResource
  selectedRow: PatientNotes | undefined
  selectedRows: PatientNotes[]
  isCreateNoteView: boolean
  errorMessage: string
  isErrorAlertOpen: boolean
  setPatientId: (id: string) => void
  setData: (data: GetPatientNotesResponse) => void
  setAllergies: (allergies: Allergy[]) => void
  setPatient: (patient: PatientProfile) => void
  setAppointmentId: (id: string) => void
  setSelectedRow: (value: PatientNotes | undefined) => void
  setSelectedRows: (value: PatientNotes[]) => void
  setAppointment: (value: Appointment) => void
  setIsCreateNoteView: (value: boolean) => void
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  fetchAppointment: (appointmentId: string) => void
  fetchAppointments: (patientId: string, appointmentId: string) => void
  fetchNoteDetail: (payload: GetNoteDetailsParams) => void
  setLoadingDetail: (loadingDetail: boolean) => void
  fetch: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchWidgets: (params: {
    visitType: string
    visitSequence: string
    providerType: string
  }) => void
  updateNotesDetails: (addendum: Addendum | {}) => void
  fetchAddendumsDetails: (
    patientId: string,
    appointmentId: string,
    noteId: string,
  ) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  appointmentId: '',
  data: undefined,
  loading: false,
  loadingDetail: false,
  error: undefined,
  appointment: undefined,
  appointments: undefined,
  allergies: undefined,
  widgets: [],
  selectedRow: undefined,
  selectedRows: [],
  isErrorAlertOpen: false,
  errorMessage: '',
  isCreateNoteView: false,
  setData: (data) => set({ data }),
  setAllergies: (allergies) => set({ allergies }),
  setPatient: (patient) => set({ patient }),
  setPatientId: (patientId) => set({ patientId }),
  setLoadingDetail: (loadingDetail) => set({ loadingDetail }),
  setAppointment: (appointment) => set({ appointment }),
  setAppointmentId: (appointmentId) => set({ appointmentId }),
  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  fetch: async (payload) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getPatientNotesAction(payload)
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
    })
  },
  fetchAppointment: async (appointmentId: string) => {
    set({
      error: undefined,
    })

    const appointment = await getAppointment({
      id: appointmentId,
      shouldHaveCode: true,
      shouldHaveCosigners: true,
      shouldHaveLocation: true,
    })

    if (appointment.state === 'error') {
      return set({
        error: appointment.error,
      })
    }

    set({
      appointment: appointment.data,
    })
  },
  fetchAppointments: async (patientId: string, appointmentId: string) => {
    set({
      error: undefined,
    })

    const appointments = await getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
      isFollowUp: true,
    })

    if (appointments.state === 'error') {
      return set({
        error: appointments.error,
      })
    }

    set({
      appointments: appointments.data,
    })
  },
  fetchNoteDetail: async (payload: GetNoteDetailsParams) => {
    set({
      error: undefined,
    })
    const response = await getNoteDetailsAction(payload)

    if (response.state === 'error') {
      return set({
        error: response.error,
      })
    }

    set({
      noteDetail: response.data,
    })
  },

  fetchWidgets: ({ visitType, visitSequence, providerType }) => {
    set({ loadingDetail: true, error: undefined })
    const widgetsArray = getWidgetsArrayByVisitType(
      visitType,
      visitSequence,
      providerType,
    )
    set({ widgets: widgetsArray })
  },

  updateNotesDetails: (addendum) => {
    const { noteDetail } = get()
    if (addendum && noteDetail && noteDetail?.length > 0) {
      const newNoteDetails = [...noteDetail]
      newNoteDetails[0].addendum = { ...addendum }
      set({
        noteDetail: newNoteDetails,
      })
    }
  },

  fetchAddendumsDetails: async (
    patientId: string,
    appointmentId: string,
    noteId: string,
  ) => {
    set({
      error: undefined,
    })
    const { updateNotesDetails } = get()

    const response = await getAddendumDetailsAction(
      patientId,
      appointmentId,
      noteId,
    )

    if (response.state === 'error') {
      return set({
        error: response.error,
      })
    }

    updateNotesDetails(response.data)
  },
}))

export { useStore }
