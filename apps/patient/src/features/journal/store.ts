import { getLocalTimeZone, today } from '@internationalized/date'
import { getCalendarDate, getCalendarDateLabel } from '@psychplus-v2/utils'
import { create } from 'zustand'
import { type SearchJournalResponse, type UnifiedAttachment } from './types'

export interface JournalFormData {
  title: string
  content: string
  attachments: UnifiedAttachment[]
}

interface JournalStore {
  startingDate: string
  selectedDate: string
  formData: JournalFormData
  journalEntries: SearchJournalResponse[]
  currentJournalId: string | null
  isLoading: boolean
  prev: () => void
  next: () => void
  setSelectedDate: (date: string) => void
  setFormData: (data: JournalFormData) => void
  setJournalEntries: (entries: SearchJournalResponse[]) => void
  setCurrentJournalId: (journalId: string | null) => void
  setIsLoading: (loading: boolean) => void
  resetForm: () => void
}

const useStore = create<JournalStore>((set, get) => ({
  startingDate: getCalendarDateLabel(today(getLocalTimeZone())),
  selectedDate: getCalendarDateLabel(today(getLocalTimeZone())),
  formData: {
    title: '',
    content: '',
    attachments: [],
  },
  journalEntries: [],
  currentJournalId: null,
  isLoading: false,
  
  prev: () => {
    const { startingDate } = get()
    const newStartingDate = getCalendarDate(startingDate).subtract({ days: 7 })
    const ninetyDaysAgo = today(getLocalTimeZone()).subtract({ days: 90 })
    if (getCalendarDate(startingDate).compare(ninetyDaysAgo) < 0) {
      return
    }
    set({
      startingDate: getCalendarDateLabel(newStartingDate),
    })
  },  
  
  next: () => {
    const newStartingDate = getCalendarDate(get().startingDate).add({
      days: 7,
    })
    
    const todaysDate = today(getLocalTimeZone())
    if (newStartingDate.compare(todaysDate) > 0) {
      return
    }
    
    set({
      startingDate: getCalendarDateLabel(newStartingDate),
    })
  },

  setSelectedDate: (date: string) => {
    set({ selectedDate: date })
  },

  setFormData: (data: JournalFormData) => {
    set({ formData: data })
  },

  setJournalEntries: (entries: SearchJournalResponse[]) => {
    set({ journalEntries: entries })
  },

  setCurrentJournalId: (journalId: string | null) => {
    set({ currentJournalId: journalId })
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  resetForm: () => {
    set({
      formData: {
        title: '',
        content: '',
        attachments: [],
      },
      currentJournalId: null,
    })
  },
}))

export { useStore } 