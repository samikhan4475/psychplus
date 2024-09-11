'use client'

import { type StateCreator } from 'zustand'
import { ResponseHistoryListState } from './types'

const responseHistoryListStore: StateCreator<ResponseHistoryListState> = (set) => ({
  responseHistoryList: [],
  setResponseHistoryList (responseHistory) {
    set({ responseHistoryList: responseHistory })
  },
  responseHistoryModalOpen: false,
  setResponseHistoryModalOpen (open) {
    set({ responseHistoryModalOpen: open })
  },
  responseHistoryBatchId: '',
  setResponseHistoryBatchId (batchId) {
    set({ responseHistoryBatchId: batchId })
  },
})

export { responseHistoryListStore, type ResponseHistoryListState }
