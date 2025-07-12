'use client'

import { DateValue } from 'react-aria-components'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { formatDateToISOString } from '@/utils'
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
import { sanitizeFormData } from './utils'

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
  abortController: null,
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
    if (get().abortController) {
      get().abortController!.abort()
    }

    const abortController = new AbortController()

    set({
      error: undefined,
      loading: true,
      formValues,
      abortController,
    })

    const isInboxOrArchived = ['Inbox', 'Archived'].includes(
      formValues.messageStatus as string,
    )
    const payload = {
      page,
      ...formValues,
      isConversationalView: isInboxOrArchived,
      isConversationRequired: isInboxOrArchived,
      from: formValues.from
        ? formatDateToISOString(formValues.from as DateValue)
        : undefined,
      to: formValues.to
        ? formatDateToISOString(formValues.to as DateValue, true)
        : undefined,
    }
    const finalPayload = sanitizeFormData(payload)

    try {
      const result = await getAllSecureMessagesAction(finalPayload, {
        signal: abortController.signal,
      })

      if (abortController.signal.aborted) return []

      if (result.state === 'error') {
        toast.error(result.error || 'Failed to fetch data')
        set({
          error: result.error,
          loading: false,
          abortController: null,
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
        abortController: null,
      })
      return messages
    } catch (error) {
      if (abortController.signal.aborted) {
        return []
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch data'
      toast.error(errorMessage)
      set({
        error: errorMessage,
        loading: false,
        abortController: null,
      })
      return []
    }
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

    if (get().pageCache[page]) {
      set({
        secureMessages: get().pageCache[page],
        page,
      })
      return get().pageCache[page]
    }

    return []
  },
}))

export { useStore }
