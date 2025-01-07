import { create } from 'zustand'
import { QuickNoteHistory } from '@/types'

interface TabState {
  activeTab: string
  viewedTabs: QuickNoteHistory[]
  history: QuickNoteHistory[]
  selectedDate?: string
  setActiveTab: (tab: string) => void
  addTab: (history: QuickNoteHistory[], row: QuickNoteHistory) => void
  clearTabs: () => void
}

const useStore = create<TabState>((set) => ({
  activeTab: '',
  history: [],
  viewedTabs: [],
  setActiveTab: (tab) => {
    set({ activeTab: tab })
  },
  addTab: (history, row) => {
    set({
      history: history,
      activeTab: 'View Questionnaires',
      selectedDate: row.createdOn,
    })
  },
  clearTabs: () => {
    set({ history: [], activeTab: 'History' })
  },
}))

export { useStore }
