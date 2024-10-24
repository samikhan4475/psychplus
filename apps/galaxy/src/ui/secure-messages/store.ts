'use client'

import { create } from 'zustand'
import { ActiveComponent, SecureMessage, SecureMessagesTab, SecureMessageStoreType } from './types'
import { getAllSecureMessagesAction } from './actions'
import { SchemaType } from './schema'

const useStore = create<SecureMessageStoreType>((set, get) => ({
  secureMessages: [],
  setSecureMessages: (secureMessages: Partial<SecureMessage>[]) =>
    set({ secureMessages }),
  previewSecureMessage: { secureMessage: null, activeTab: SecureMessagesTab.INBOX },
  setPreviewSecureMessage: (preview: { secureMessage: Partial<SecureMessage> | null; activeTab: SecureMessagesTab }) => {
    set((state) => ({
      previewSecureMessage: {
        ...state.previewSecureMessage,
        secureMessage: preview.secureMessage,
        activeTab: preview.activeTab,
      },
    }));
  },
  error: undefined,
  loading: true,
  formValues: undefined,
  page: 1,
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

    set({
      secureMessages: result.data,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
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
  }
}
))

export { useStore }
