import { PatientNotes } from '../notes/types'

enum Tabs {
  INBOX = 'inbox',
  DRAFT = 'draft',
  SENT = 'sent',
  ARCHIVED = 'archived',
  PENDING_VISITS = 'pending-visits',
  PENDING_COSIGNER_NOTES = 'pending-cosigner-notes',
  PENDING_NOTES = 'pending-notes',
  PREVIOUS_NOTES = 'previous-notes',
  DRAFT_NOTES = 'draft-notes',
  LAB_ORDERS = 'lab-orders',
  MEDICATION_ORDERS = 'medication-orders',
}

interface Store {
  visitedTabs: Set<string>
  activeTab: string
  loading: boolean
  notesData: PatientNotes[]
  setActiveTab: (activeTab: string) => void
  fetchNotes: (status: string[]) => Promise<void>
}

interface StoreInitialState {
  tab: Tabs
}

export { Tabs, type Store, type StoreInitialState }
