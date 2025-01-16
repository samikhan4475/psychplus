'use client'

import { createContext, useContext, useRef } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { saveWidgetClientAction } from '@/actions'
import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
import { postMessage, VisitTypeEnum, visitTypeToSavingWidgets } from '@/utils'
import { signNoteAction } from '../actions'
import { modifyWidgetResponse } from '../utils'

interface SignPayloadProps {
  patientId: string
  appointmentId: string
  appointment: Appointment
  visitType: string
}

interface Store {
  loading: boolean
  patient: PatientProfile
  save: () => void
  sign: (payload: SignPayloadProps) => Promise<any>
  cosignerLabel?: string
  setCosignerLabel: (value: string) => void
  unsavedChanges: Record<string, boolean>
  setUnsavedChanges: (widgetName: string, unsavedChanges: boolean) => void
  toggleActualNoteView: () => void
  showActualNoteView: boolean
  isMarkedAsError: boolean
  closeMarkErrorModal: (isMarkedAsError: boolean) => void
  markAsError: (payload: { patientId: string; appointmentId: string }) => void
  errorMessage?: string
  signOptions: Record<string, string>
  setSignOptions: (option: Record<string, string>) => void
  isErrorAlertOpen: boolean
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  widgetsData: Record<string, QuickNoteSectionItem[]>
  setWidgetsData: (data: QuickNoteSectionItem[]) => void
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
    setWidgetsData: (data) => {
      const newData = modifyWidgetResponse(data)
      set({ widgetsData: { ...get().widgetsData, ...newData } })
    },
    loading: false,
    showActualNoteView: true,
    isMarkedAsError: false,
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
    save: async () => {
      set({ loading: true })
      const response = await saveWidgets()
      if (response.length) {
        toast.success('Quicknote saved!')
        get().setWidgetsData(response)
      }
      set({ loading: false })
    },
    sign: async (payload) => {
      try {
        set({ loading: true })
        const response = await saveWidgets()
        if (!response.length) {
          set({ loading: false })
          return {
            state: 'error',
            error: 'Failed to save widgets',
          }
        }
        get().setWidgetsData(response)
        const { coSignedByUserId } = get().signOptions || {}
        const signedDate = new Date(
          payload.appointment?.startDate || new Date(),
        ).toISOString()
        const signResults = await signNoteAction({
          ...payload,
          signedDate,
          coSignedByUserId,
        })
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
    closeMarkErrorModal: (isMarkedAsError) => {
      set({ isMarkedAsError })
    },
    markAsError: async (payload) => {
      set({ loading: true })
      const signResults = await signNoteAction({
        ...payload,
        isError: true,
      })
      set({ isMarkedAsError: false, errorMessage: '', loading: false })
      if (signResults.state === 'success') {
        toast.success('Quicknote signed successfully')
        return
      }
      toast.error(signResults.error)
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

const saveWidgets = async (): Promise<QuickNoteSectionItem[]> => {
  const urlParams = new URLSearchParams(window.location.search)
  const patientId = urlParams.get('id') as string
  const visitType = urlParams.get('visitType') as string
  const isValidateAll = await validateAll(visitType)
  if (!isValidateAll) {
    return []
  }
  const widgets = visitTypeToSavingWidgets[visitType as VisitTypeEnum] || []
  const promises = widgets.map((widgetId) => {
    return new Promise<{
      success: boolean
      widgetId: string
      sections: QuickNoteSectionItem[]
    }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:saveAll' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })

  postMessage({ type: 'quicknotes:saveAll' })
  const responses = await Promise.all(promises)
  const sections = responses.flatMap((response) => response.sections)

  const uniqueSections = sections.filter(
    (section, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.sectionName === section.sectionName &&
          t.sectionItemValue === section.sectionItemValue &&
          t.sectionItem === section.sectionItem,
      ),
  )
  const payload = { patientId, data: uniqueSections }

  try {
    const result = await saveWidgetClientAction(payload)
    if (result.state === 'error') {
      toast.error('Failed to save!')
      return []
    }
    return uniqueSections
  } catch (error) {
    toast.error('Failed to save!')
    return []
  }
}

const validateAll = async (visitType: string) => {
  const widgets = visitTypeToSavingWidgets[visitType as VisitTypeEnum] || []
  const promises = widgets.map((widgetId) => {
    return new Promise<{ success: boolean; widgetId: string }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:validate' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })
  postMessage({ type: 'quicknotes:validateAll' })
  const responses = await Promise.all(promises)

  let widgetErrors = ''
  responses.forEach((element) => {
    if (!element.success) {
      widgetErrors += `${element.widgetId.replace('QuicknoteSection', '')}, `
    }
  })
  widgetErrors = widgetErrors.slice(0, widgetErrors.length - 2)

  if (widgetErrors !== '') {
    toast.error(`Please fill out all required fields in ${widgetErrors}`)
  }
  return responses.every((element) => element.success)
}

export { StoreProvider, useStore, createStore }
