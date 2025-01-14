import { Metadata } from '@/types'

interface VacationsTime {
  metadata?: Metadata
  id: number
  recordStatus: string
  staffId: number
  startDateTime: string
  endDateTime: string
  duration: string
  vacationStatus: string
}

interface ActiveVisit {
  patientName: string
  gender: string
  age: string
  visitService: string
  visitType: string
  visitStatus: string
  location: string
  dateTime: string
}

export type { VacationsTime, ActiveVisit }
