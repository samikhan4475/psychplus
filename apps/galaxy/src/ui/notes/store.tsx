import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { getAppointment } from '@/actions'
import { Appointment, PatientProfile, StaffResource } from '@/types'
import { createZustandContext } from '@/utils/createZustandContext'
import { getPatientAllergiesAction } from '../allergy/patient-allergies-widget/client-actions'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { getBookedAppointmentsAction } from '../schedule/client-actions'
import {
  getNoteDetailsAction,
  GetNoteDetailsParams,
  getPatientNotesAction,
  getStaffNotesAction,
} from './actions'
import { getAddendumDetailsAction } from './actions/get-addendum'
import { getPatientProfileAction } from './client-actions/get-patient-profile'
import { getCachedWidgetsByVisitType } from './note-detail/utils'
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
  data: GetPatientNotesResponse | undefined
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
  isInboxNotes: boolean
  addAddendum: boolean
  tab?: string
  page: number
  formData?: GetPatientNotesParams
  pageCache: Record<number, GetPatientNotesResponse | undefined>
  next: (payload: GetPatientNotesParams) => void
  prev: (payload: GetPatientNotesParams) => void
  jumpToPage: (payload: GetPatientNotesParams, page: number) => void
  setPatientId: (id: string) => void
  setTab: (tab?: string) => void
  setData: (data: GetPatientNotesResponse | undefined) => void
  setAllergies: (allergies: Allergy[]) => void
  setPatient: (patient: PatientProfile) => void
  setAppointmentId: (id: string) => void
  setSelectedRow: (value: PatientNotes | undefined) => void
  setSelectedRows: (value: PatientNotes[]) => void
  setAppointment: (value: Appointment) => void
  setIsCreateNoteView: (value: boolean) => void
  setAddAddendum: (addAddendum: boolean) => void
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  setIsInboxNotes: (value: boolean) => void
  fetchAppointment: (appointmentId: string) => void
  fetchPatient: (patientId: string) => void
  fetchPatientAllergies: (patientId: string) => void
  fetchAppointments: (patientId: string, appointmentId: string) => void
  fetchNoteDetail: (payload: GetNoteDetailsParams) => void
  setLoadingDetail: (loadingDetail: boolean) => void
  setLoading: (loading: boolean) => void
  fetch: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchStaffNotes: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchWidgets: (params: {
    visitType: string
    visitSequence: string
    providerType: string
  }) => void
  updateNotesDetails: (addendum: Addendum | object) => void
  fetchAddendumsDetails: (
    patientId: string,
    appointmentId: string,
    noteId: string,
  ) => void
}

const createStore = () =>
  zustandCreateStore<Store>()((set, get) => ({
    patientId: '',
    addAddendum: false,
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
    isInboxNotes: false,
    errorMessage: '',
    isCreateNoteView: false,
    tab: undefined,
    page: 1,
    pageCache: {},
    formData: undefined,
    setAddAddendum: (addAddendum) => set({ addAddendum }),
    setData: (data) => set({ data }),
    setTab: (tab) => set({ tab }),
    setAllergies: (allergies) => set({ allergies }),
    setPatient: (patient) => set({ patient }),
    setPatientId: (patientId) => set({ patientId }),
    setLoadingDetail: (loadingDetail) => set({ loadingDetail }),
    setLoading: (loading) => set({ loading }),
    setAppointment: (appointment) => set({ appointment }),
    setAppointmentId: (appointmentId) => set({ appointmentId }),
    setSelectedRow: (selectedRow) => set({ selectedRow }),
    setSelectedRows: (selectedRows) => set({ selectedRows }),
    setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
    setErrorMessage: (errorMessage) => set({ errorMessage }),
    setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
    setIsInboxNotes: (isInboxNotes) => set({ isInboxNotes }),
    fetchPatient: async (patientId: string) => {
      set({
        error: undefined,
      })

      const patient = await getPatientProfileAction(patientId)

      if (patient.state === 'error') {
        return set({
          error: patient.error,
        })
      }

      set({
        patient: patient.data,
      })
    },
    fetchPatientAllergies: async (patientId: string) => {
      set({
        error: undefined,
      })

      const payload = {
        patientIds: [patientId],
      }

      const allergies = await getPatientAllergiesAction({ payload })

      if (allergies.state === 'error') {
        return set({
          error: allergies.error,
        })
      }

      set({
        allergies: allergies.data,
      })
    },
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
    fetchStaffNotes: async (payload, page = 1, reset = false) => {
      set({
        error: undefined,
        formData: payload,
        loading: true,
      })
      const result = await getStaffNotesAction({ ...payload, page })
      if (result.state === 'error') {
        return set({
          error: result.error,
          loading: false,
        })
      }
      set({
        data: result.data,
        loading: false,
        pageCache: reset
          ? { [page]: result.data }
          : { ...get().pageCache, [page]: result.data },
        page,
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
        isShowActiveVisits: true,
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
      const widgetsArray = getCachedWidgetsByVisitType(
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
    next: (payload) => {
      const page = get().page + 1
      if (get().pageCache[page]) {
        return set({
          data: get().pageCache[page],
          page,
        })
      }
      get().fetchStaffNotes(payload, page)
    },
    prev: (payload) => {
      const page = get().page - 1
      if (get().pageCache[page]) {
        return set({
          data: get().pageCache[page],
          page,
        })
      }
      get().fetchStaffNotes(payload, page)
    },
    jumpToPage: (payload, page: number) => {
      if (page < 1) {
        return
      }

      if (get().pageCache[page]) {
        return set({
          data: get().pageCache[page],
          page,
        })
      }

      get().fetchStaffNotes(payload, page)
    },
  }))

const { StoreProvider, useStore } = createZustandContext<Store>(createStore)

export { StoreProvider, useStore, createStore }
