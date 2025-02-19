import { ActiveVisitSchemaType } from './active-visit-form'

interface ActiveVisitFilters {
  staffId: number
  startDateTime?: string
  endDateTime?: string
}
interface DeleteActiveVisit {
  patientId: number
  appointmentId: number
}

interface GetActiveVisitListParams {
  payload: Partial<GetActiveVisitFilters>
  page?: number
}

enum AppointmentStatus {
  Scheduled = 'Scheduled',
}

interface GetActiveVisitFilters extends ActiveVisitSchemaType {
  serviceIds: string[]
  locationIds: string[]
}
export {
  type ActiveVisitFilters,
  type GetActiveVisitListParams,
  type DeleteActiveVisit,
  type GetActiveVisitFilters,
  AppointmentStatus,
}
