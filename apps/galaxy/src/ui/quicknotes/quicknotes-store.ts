import toast from 'react-hot-toast'
import { create } from 'zustand'
import { signNoteAction } from './actions'
import { QuickNoteSectionName } from './constants'

interface Store {
  loading: boolean
  save: () => void
  sign: (payload: { patientId: string; appointmentId: string }) => void
  unsavedChanges: Record<string, boolean>
  setUnsavedChanges: (widgetName: string, unsavedChanges: boolean) => void
  toggleActualNoteView: () => void
  showActualNoteView: boolean
  isMarkedAsError: boolean
  closeMarkErrorModal: (isMarkedAsError: boolean) => void
  markAsError: (payload: { patientId: string; appointmentId: string }) => void
  errorMessage?: string
}

const useStore = create<Store>()((set, get) => ({
  loading: false,
  showActualNoteView: true,
  isMarkedAsError: false,
  errorMessage: '',
  toggleActualNoteView: () =>
    set({ showActualNoteView: !get().showActualNoteView }),
  save: async () => {
    set({ loading: true })
    await saveWidgets()
    toast.success('Quicknote saved!')
    set({ loading: false })
  },

  sign: async (payload) => {
    set({ loading: true })
    await saveWidgets()
    const signResults = await signNoteAction(payload)
    if (signResults.state === 'success') {
      toast.success('Quicknote signed!')
      set({ loading: false })
      return
    }


    if (signResults.error.includes('mark that note as error?')) {
      set({
        loading: false,
        isMarkedAsError: true,
        errorMessage: signResults.error,
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

const saveWidgets = () => {
  const widgets = [QuickNoteSectionName.QuicknoteSectionHPI]
  const promises = widgets.map((widgetId) => {
    return new Promise<boolean>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:save' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data.success)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })

  window.postMessage({ type: 'quicknotes:save' }, '*')

  return Promise.all(promises)
}

export { useStore }
