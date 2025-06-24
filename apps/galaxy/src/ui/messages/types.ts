import { GetPatientNotesResponse } from '../notes/types'

enum Tabs {
  INBOX = 'Inbox',
  DRAFT = 'Draft',
  SENT = 'Sent',
  ARCHIVED = 'Archived',
  PENDING_VISITS = 'pending-visits',
  PENDING_COSIGNER_NOTES = 'pending-cosigner-notes',
  PENDING_NOTES = 'pending-notes',
  PREVIOUS_NOTES = 'previous-notes',
  DRAFT_NOTES = 'draft-notes',
  LAB_ORDERS = 'lab-orders',
  MEDICATION_ORDERS = 'medication-orders',
  LAB_RESULTS = 'lab-results',
  PHARMACY_NOTIFICATIONS = 'pharmacy-notifications',
}

interface Store {
  visitedTabs: Set<string>
  activeTab: string
  loading: boolean
  notesData: GetPatientNotesResponse | undefined
  setActiveTab: (activeTab: string) => void
  isEmrDirectUser: boolean | undefined
  fetchEmrDirectStatus: () => Promise<boolean>
  unreadCount: number
  setUnreadCount: (unreadCount: number) => void
  fetchUnreadCount: () => Promise<number>
  fetchNotes: (status: string[]) => Promise<void>
}

interface StoreInitialState {
  tab: Tabs
}

export { Tabs, type Store, type StoreInitialState }
