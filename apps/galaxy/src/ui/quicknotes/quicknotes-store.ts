import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { VisitTypeEnum, visitTypeToSavingWidgets } from '@/utils'
import { signNoteAction } from './actions'

interface SignPayloadProps {
  patientId: string
  appointmentId: string
  appointment: Appointment
  visitType: string
}

interface Store {
  loading: boolean
  save: (visitType: string) => void
  sign: (payload: SignPayloadProps) => void
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
  cosignerLabel?: string
  setCosignerLabel: (value: string) => void
}

const useStore = create<Store>()((set, get) => ({
  loading: false,
  showActualNoteView: true,
  isMarkedAsError: false,
  errorMessage: '',
  isErrorAlertOpen: false,
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  signOptions: { time: format(new Date(), 'HH:mm') },
  cosignerLabel: '',
  setCosignerLabel: (cosignerLabel) => set({ cosignerLabel }),
  setSignOptions: (option) =>
    set({ signOptions: { ...get().signOptions, ...option } }),
  toggleActualNoteView: () =>
    set({ showActualNoteView: !get().showActualNoteView }),
  save: async (visitType) => {
    set({ loading: true })
    const isSaved = await saveWidgets(visitType)
    if (isSaved) {
      toast.success('Quicknote saved!')
    }
    set({ loading: false })
  },

  sign: async (payload) => {
    set({ loading: true })
    const isSaved = await saveWidgets(payload.visitType)
    if (!isSaved) {
      set({ loading: false })
      return
    }
    const { time, coSignedByUserId } = get().signOptions || {}

    const [hours, minutes] = time.split(':').map(Number)
    const signedDate = new Date(payload.appointment?.startDate || new Date())
    signedDate.setUTCHours(hours, minutes)

    const signResults = await signNoteAction({
      ...payload,
      signedDate: signedDate.toISOString(),
      coSignedByUserId,
    })

    if (signResults.state === 'success') {
      toast.success('Quicknote signed!')
      set({ loading: false })
      return
    }

    if (signResults.error.includes('mark that note as error?')) {
      set({
        loading: false,
        isMarkedAsError: true,
        errorMessage:
          'Primary note for this visit already exists, if you sign this note, it will mark the existing note as ERROR',
      })
      return
    }

    toast.error(signResults.error)
    set({ loading: false })
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

const saveWidgets = async (visitType: string) => {
  const widgets = visitTypeToSavingWidgets[visitType as VisitTypeEnum] || []
  const promises = widgets.map((widgetId) => {
    return new Promise<{ success: boolean; widgetId: string }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:save' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })

  window.postMessage({ type: 'quicknotes:save' }, '*')
  const responses = await Promise.all(promises)
  responses.forEach((element: { success: boolean; widgetId: string }) => {
    if (!element.success) {
      toast.error(`Failed to save! ${element.widgetId}`)
    }
  })
  return responses.every((element) => element.success)
}

export { useStore }
