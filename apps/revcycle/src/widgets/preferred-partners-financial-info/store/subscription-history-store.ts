import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type SubscriptionHistory } from '../types'

interface SubscriptionHistoryState {
  subscriptionHistoryList: SubscriptionHistory[]
  setSubscriptionHistoryList: (
    subscriptionHistoryList: SubscriptionHistory[],
  ) => void
}

type SubscriptionHistoryStoreType = UseBoundStore<
  StoreApi<SubscriptionHistoryState>
>

const createSubscriptionHistoryStore: StateCreator<SubscriptionHistoryState> = (
  set,
  get,
  store,
) => ({
  subscriptionHistoryList: [],
  setSubscriptionHistoryList: (
    subscriptionHistoryList: SubscriptionHistory[],
  ) => set({ subscriptionHistoryList }),
})

export {
  createSubscriptionHistoryStore,
  type SubscriptionHistoryStoreType,
  type SubscriptionHistoryState,
}
