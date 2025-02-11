'use client'

import { createContext, useContext, useRef } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import {
  Appointment,
  PatientProfile,
  QuickNoteSectionItem,
  UpdateCptCodes,
} from '@/types'
import { manageCodes } from '@/utils'
import { signNoteAction } from '../actions'
import { QuickNoteSectionName } from '../constants'
import { modifyWidgetResponse } from '../utils'
import { saveWidgets } from './utils'

interface SignPayloadProps {
  patientId: string
  appointmentId: string
  signedByUserId: number
  appointment: Appointment
}

interface Store {
  loading: boolean
  patient: PatientProfile
  save: (appointment: Appointment) => void
  sign: (payload: SignPayloadProps) => Promise<any>
  markAsError: (payload: SignPayloadProps) => void
  cosignerLabel?: string
  setCosignerLabel: (value: string) => void
  unsavedChanges: Record<string, boolean>
  setUnsavedChanges: (widgetName: string, unsavedChanges: boolean) => void
  toggleActualNoteView: () => void
  showActualNoteView: boolean
  errorMessage?: string
  signOptions: Record<string, string>
  setSignOptions: (option: Record<string, string>) => void
  isErrorAlertOpen: boolean
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  widgetsData: Record<string, QuickNoteSectionItem[]>
  actualNotewidgetsData: Record<string, QuickNoteSectionItem[]>
  setWidgetsData: (data: QuickNoteSectionItem[]) => void
  setActualNoteWidgetsData: (data: QuickNoteSectionItem[]) => void
  updateCptCodes: UpdateCptCodes
  setMarkedStatus: (payload: boolean) => void
  isMarkedAsError?: boolean
}

interface StoreInitialState {
  patientId: string
  patient: PatientProfile
  appointment?: Appointment
  isTabView?: boolean
  widgetsData?: Record<string, QuickNoteSectionItem[]>
}

const createStore = (initialState: StoreInitialState) =>
  zustandCreateStore<Store>()((set, get) => ({
    patientId: initialState.patientId,
    patient: initialState.patient,
    widgetsData: initialState.widgetsData ?? {},
    setWidgetsData: (data = []) => {
      const modifiedData = modifyWidgetResponse(data)
      set({ widgetsData: { ...get().widgetsData, ...modifiedData } })
    },
    actualNotewidgetsData: {},
    setActualNoteWidgetsData: (data = []) => {
      const modifiedData = modifyWidgetResponse(
        data?.filter(
          (item) =>
            !item?.sectionName?.includes(
              QuickNoteSectionName.QuicknoteSectionQuestionnaire,
            ),
        ),
      )
      set({
        actualNotewidgetsData: {
          ...get().actualNotewidgetsData,
          ...modifiedData,
        },
      })
    },
    updateCptCodes: async (
      patientId,
      appointmentId,
      widgetAllCptCodes,
      selectedCodes,
    ) => {
      const { actualNotewidgetsData, setActualNoteWidgetsData } = get()
      const cptCodes =
        actualNotewidgetsData[QuickNoteSectionName.QuicknoteSectionCodes]
      const data = await manageCodes(
        patientId,
        appointmentId,
        widgetAllCptCodes,
        selectedCodes,
        cptCodes,
        true,
      )
      setActualNoteWidgetsData(data)
      return data
    },
    loading: false,
    showActualNoteView: true,
    errorMessage: '',
    isErrorAlertOpen: false,
    cosignerLabel: '',
    setCosignerLabel: (cosignerLabel) => set({ cosignerLabel }),
    setErrorMessage: (errorMessage) => set({ errorMessage }),
    setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
    signOptions: { time: format(new Date(), 'HH:mm') },
    setSignOptions: (option) =>
      set({ signOptions: { ...get().signOptions, ...option } }),
    toggleActualNoteView: () =>
      set({ showActualNoteView: !get().showActualNoteView }),
    save: async (appointment) => {
      set({ loading: true })
      const data = get().actualNotewidgetsData
      const widgetsData = Object.entries(data)
        .map(([, sections]) => sections)
        .flat()
      const response = await saveWidgets(appointment, widgetsData)
      if (response?.length) {
        toast.success('Quicknote saved!')
        get().setWidgetsData(response)
      }
      set({ loading: false })
    },
    sign: async (payload) => {
      try {
        set({ loading: true })
        const data = get().actualNotewidgetsData
        const widgetsData = Object.entries(data)
          .map(([, sections]) => sections)
          .flat()
        const response = await saveWidgets(payload.appointment, widgetsData)
        if (!response?.length) {
          set({ loading: false })
          return {
            state: 'error',
            error: 'Failed to save widgets',
          }
        }
        get().setWidgetsData(response)
        const { coSignedByUserId } = get().signOptions || {}
        const body = {
          ...payload,
          coSignedByUserId,
        }

        const signResults = await signNoteAction(body)
        set({ loading: false })
        return signResults
      } catch (error) {
        set({ loading: false })
        return {
          state: 'error',
          error: JSON.stringify(error),
        }
      }
    },
    setMarkedStatus: (payload) => {
      set({ isMarkedAsError: payload })
    },
    markAsError: async (payload) => {
      try {
        set({ loading: true })
        const { coSignedByUserId } = get().signOptions || {}
        const body = {
          ...payload,
          coSignedByUserId,
          isError: true,
        }
        const signResults = await signNoteAction(body)
        set({ loading: false })
        if (signResults.state === 'success') {
          toast.success('Quicknote signed!')
          return
        }
        set({ isMarkedAsError: true })
        toast.error(signResults.error)
      } catch (e) {
        set({ loading: false, isMarkedAsError: true })
        toast.error(`${e}`)
        return
      }
    },

    unsavedChanges: {},
    setUnsavedChanges: (widgetName, unsavedChanges) => {
      set((state) => {
        return {
          unsavedChanges: {
            ...state.unsavedChanges,
            [widgetName]: unsavedChanges,
          },
        }
      })
    },
  }))

const StoreContext = createContext<StoreApi<Store> | undefined>(undefined)

const StoreProvider = ({
  children,
  ...initialState
}: React.PropsWithChildren<StoreInitialState>) => {
  const storeRef = useRef<StoreApi<Store>>()

  if (!storeRef.current) {
    storeRef.current = createStore(initialState)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = <T,>(selector: (store: Store) => T): T => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error(`useStore must be use within StoreProvider`)
  }

  return zustandUseStore(context, selector)
}

export { StoreProvider, useStore, createStore }
