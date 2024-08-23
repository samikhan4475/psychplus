import toast from 'react-hot-toast'
import { create } from 'zustand'

interface Store {
  loading: boolean
  save: () => void
  unsavedChanges: Record<string, boolean>
  setUnsavedChanges: (widgetName: string, unsavedChanges: boolean) => void
}

const useStore = create<Store>()((set, get) => ({
  loading: false,
  save: async () => {
    set({ loading: true })

    const results = await saveWidgets()

    toast.success('Quicknote saved!')

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
}))

const saveWidgets = () => {
  const widgets = ['hpi']

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
