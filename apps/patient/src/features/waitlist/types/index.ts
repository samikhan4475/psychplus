import { LegalName, Metadata } from '@psychplus-v2/types'

interface Waitlist {
  id: string
  metadata: Metadata
  recordStatus: string
  serviceOffered: string
  serviceOfferedDescription: string
  visitMedium: string
  providerId: number
  providerName: LegalName
  waitingStatus: WaitlistStatus
  fromDate: string
  fromTime: string
  toDate: string
  toTime: string
  patientId: number
  patientName: LegalName
  isAlertSent: boolean
  priority: WaitlistPriority
}

enum WaitlistPriority {
  FirstAvailable = 'FirstAvailable',
  Custom = 'Custom',
}

enum WaitlistStatus {
  Waitlist = 'Waitlist',
  Available = 'Available',
  Expired = 'Expired',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export { type Waitlist, WaitlistPriority, WaitlistStatus }
