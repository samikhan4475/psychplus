import { create } from 'zustand'
import { getCredentialingListAction } from '../actions'
import { CredentialingManager } from '../types'

interface Store {
  data: CredentialingManager[]
  search: (practiceId: string) => void
  loading: boolean
  selectedList: CredentialingManager[]
  setData: (data: CredentialingManager[]) => void
  setSelectedList: (selectedList: CredentialingManager[]) => void
}

const useStore = create<Store>((set, get) => ({
  selectedList: [],
  data: [],
  loading: true,
  setData: (data) => {
    set({
      data,
    })
  },
  search: async (pracitceId) => {
    set({
      loading: true,
    })
    const result = await getCredentialingListAction(pracitceId)
    if (result.state === 'error') {
      return set({
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
    })
  },
  setSelectedList: (selectedList) => {
    set({
      selectedList,
    })
  },
}))

export { useStore }
