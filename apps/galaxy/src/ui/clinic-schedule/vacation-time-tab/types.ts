import { Metadata, Sort } from '@/types'

interface VacationTime {
  metadata?: Metadata
  id: number
  recordStatus: string
  staffId: number
  startDateTime: string
  endDateTime: string
  duration: string
  vacationStatus: string
  isActiveClinicVisitPresent: boolean
}
interface GetVacationsListParams {
  formValues?: Partial<GetVacationFilters>
  page?: number
  sort?: Sort
}

interface GetVacationFilters {
  fromDate: string
  toDate: string
  status: string
}
interface VacationPayload {
  id?: number
  recordStatus: string
  staffId: number
  startDateTime: string
  endDateTime: string
  duration: string
  vacationStatus: string
}
enum VacationStatus {
  Approved = 'Approved',
}
export {
  type VacationTime,
  type GetVacationsListParams,
  type GetVacationFilters,
  type VacationPayload,
  VacationStatus,
}
