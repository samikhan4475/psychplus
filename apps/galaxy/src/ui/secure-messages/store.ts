'use client'

import toast from 'react-hot-toast'
import { create } from 'zustand'
import {
  createForwardMessageAction,
  getAllSecureMessagesAction,
} from './actions'
import { SchemaType } from './schema'
import {
  ActiveComponent,
  SecureMessage,
  SecureMessagesTab,
  SecureMessageStoreType,
} from './types'

const useStore = create<SecureMessageStoreType>((set, get) => ({
  secureMessages: [],
  setSecureMessages: (secureMessages: Partial<SecureMessage>[]) =>
    set({ secureMessages }),
  previewSecureMessage: {
    secureMessage: null,
    activeTab: SecureMessagesTab.INBOX,
  },
  setPreviewSecureMessage: (preview: {
    secureMessage: Partial<SecureMessage> | null
    activeTab: SecureMessagesTab
  }) => {
    set((state) => ({
      previewSecureMessage: {
        ...state.previewSecureMessage,
        secureMessage: preview.secureMessage,
        activeTab: preview.activeTab,
      },
    }))
  },
  error: undefined,
  loading: true,
  creatingForwardMessage: false,
  formValues: undefined,
  page: 1,
  total: 0,
  pageCache: {},
  activeTab: SecureMessagesTab.INBOX,
  setActiveTab: (activeTab: SecureMessagesTab) => {
    set({ activeTab })
  },
  activeComponent: ActiveComponent.NEW_EMAIL_PLACEHOLDER,
  setActiveComponent: (activeComponent: ActiveComponent) => {
    set({ activeComponent })
  },
  search: async (
    formValues: Partial<SchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getAllSecureMessagesAction({
      page,
      ...formValues,
    })

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to fetch data')
      set({
        error: result.error,
        loading: false,
      })
      return []
    }
    const { messages, total } = result.data
    set({
      secureMessages: messages,
      total,
      loading: false,
      pageCache: reset
        ? { [page]: messages }
        : { ...get().pageCache, [page]: messages },
      page,
    })
    return messages
  },
  createForwardMessage: async () => {
    set({ creatingForwardMessage: true })
    const { previewSecureMessage } = get()

    if (!previewSecureMessage.secureMessage?.id) return false
    const result = await createForwardMessageAction(
      previewSecureMessage.secureMessage?.id,
    )
    set({ creatingForwardMessage: false })
    if (result.state === 'error') {
      toast.error('Failed to forward message')
      return false
    } else {
      set({
        previewSecureMessage: {
          ...previewSecureMessage,
          secureMessage: result.data,
        },
      })
      return true
    }
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        secureMessages: get().pageCache[page],
        page,
      })
    }
    get().search(get().formValues || {}, page)
  },
  next: async (): Promise<Partial<SecureMessage>[]> => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      set({
        secureMessages: get().pageCache[page],
        page,
      })
      return get().pageCache[page]
    }

    return get().search(get().formValues || {}, page, false)
  },
  prev: () => {
    const page = get().page - 1

    set({
      secureMessages: get().pageCache[page],
      page,
    })
    return get().pageCache[page]
  },
}))

export { useStore }
