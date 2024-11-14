'use client'

import { create } from 'zustand'
import { getAllSecureMessagesAction } from './actions'
import { SchemaType } from './schema'
import {
  ActiveComponent,
  messageStatus,
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
  formValues: undefined,
  page: 1,
  total: 0,
  pageCache: {},
  activeTab: SecureMessagesTab.INBOX,
  setActiveTab: (activeTab: SecureMessagesTab) => {
    set({ activeTab })
  },
  activeComponent: ActiveComponent.NEW_EMAIL,
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
    if (formValues.status === messageStatus.READ) {
      formValues.isRead = true
    } else if (formValues.status === messageStatus.UNREAD) {
      formValues.isRead = false
    } else if (formValues.status === messageStatus.REPLIED) {
      formValues.isReplied = true
    }

    const result = await getAllSecureMessagesAction({
      page,
      ...formValues,
    })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    const { messages } = result.data
    set({
      secureMessages: messages,
      loading: false,
      pageCache: reset
        ? { [page]: messages }
        : { ...get().pageCache, [page]: messages },
      page,
    })
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
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        secureMessages: get().pageCache[page],
        page,
      })
    }

    get().search(get().formValues || {}, page, false)
  },
  prev: () => {
    const page = get().page - 1

    set({
      secureMessages: get().pageCache[page],
      page,
    })
  },
}))

export { useStore }
