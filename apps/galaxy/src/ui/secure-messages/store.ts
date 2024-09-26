'use client'

import { create } from 'zustand'
import { SecureMessage, SecureMessageStoreType } from './types'
import { getAllSecureMessagesAction } from './actions'
import { SchemaType } from './secure-messages-view'

const useStore = create<SecureMessageStoreType>((set, get) => ({
  secureMessages: [],
  setSecureMessages: (secureMessages: SecureMessage[]) =>
    set({ secureMessages }),
  previewSecureMessage: null,
  setPreviewSecureMessage: (secureMessage: SecureMessage | null) => {
    set({ previewSecureMessage: secureMessage })
  },
  error: undefined,
  loading: true,
  formValues: undefined,
  fetch: async (formValues: Partial<SchemaType> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues
    })
    const result = await getAllSecureMessagesAction({ ...formValues })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      secureMessages: result.data,
      loading: false,
    })
  },
}
))

export { useStore }
